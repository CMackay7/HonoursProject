from Vote import Vote
import copy
from collections import defaultdict
import RankedBallot
from itertools import combinations
import Graph

# This class contains all the code for running ranked votes

class RankedVote(Vote):
    # Candidates is the only one of these which contains the actual objects do not modify or copy
    def __init__(self, candidates, voteBreakdown, backup_candidates, valid_candidates, candidate_to_win):
        super().__init__(candidates, voteBreakdown, backup_candidates, valid_candidates, candidate_to_win)

    # Return the number of votes each candidate got in the specified round
    def round_x(self, round):
        out = defaultdict(int)
        for vote in self.voteBreakdown_copy:
            if len(vote.candidateRanking) >= round:
                out[vote.candidateRanking[round]] += vote.percentage
        return out

###################################################################################################################
#                                              HELPER FUNCTIONS                                                   #
###################################################################################################################

    # The instant run off method will remove the lowest candidate and distribute their preferences until someone has 50%
    # This process is done one at a time
    def instantrunoffmethod(self):
        leave = False
        #self.candidateToWin
        candidates = self.valid_candidates_copy
        while not leave:
            breakdown = self.distribute_preferences(candidates)
            breakdown = self.find_total_percentage(breakdown)

            if self.calc_to_fifty(breakdown):
                    leave = True

            if leave == False:
                lowest = self.find_lowest(breakdown)
                self.valid_candidates_copy.remove(lowest)

        #self.valid_candidates_copy = copy.deepcopy(self.valid_candidates)
        #self.reset()
        return breakdown

    # Av_plus is similar to instantrunoff but after the first round is calculated every candidate bar the top two is
    # removed and their preferences are distributed
    def av_plus(self):
        round = 1
        votes = {}
        leave = False

        breakdown = self.round_x(round)

        if self.calc_to_fifty(breakdown):
            return self.find_total_percentage(breakdown)
        else:
            two_highest = self.find_highest_two(breakdown)
            votes = self.distribute_preferences(two_highest)
        #self.reset()
        return self.find_total_percentage(votes)

    # Borda count is some maths thing
    def borda_count(self):
        n = len(self.candidates)
        vote = defaultdict(int)
        for ballot in self.voteBreakdown_copy:
            ranking = ballot.candidateRanking
            for round in ranking:
                cand = ranking[round]
                vote[ranking[round]] += (n - (round - 1)) * ballot.percentage
        #self.reset()
        return vote

    def copeland_method(self):
        comparisons = defaultdict(int)

        for perm in combinations(self.valid_candidates, 2):
            result = self.pairwise_comparison(perm[0], perm[1])
            if not result[perm[0]] == result[perm[1]]:
                if result[perm[0]] > result[perm[1]]:
                    comparisons[perm[0]] += 1
                    comparisons[perm[1]] -= 1
                else:
                    comparisons[perm[1]] += 1
                    comparisons[perm[0]] -= 1
        return comparisons

    def minmax_method(self):
        minmax_store = defaultdict(int)
        if len(self.valid_candidates_copy) == 1:
            minmax_store[self.valid_candidates_copy.pop()] = 0
            return minmax_store
        for ballot in self.voteBreakdown_copy:
            for perm in combinations(self.valid_candidates, 2):
                result = self.pairwise_comparison(perm[0], perm[1])

                # the winner of minmax method is tha candidate that has the best worst showing. so every time there is a pairwise
                # comparison if the opponenst result is better then their current worst replace it
                if minmax_store[perm[0]] < result[perm[1]]:
                    minmax_store[perm[0]] = result[perm[1]]
                if minmax_store[perm[1]] < result[perm[0]]:
                    minmax_store[perm[1]] = result[perm[0]]

        return minmax_store


    def ranked_pairs(self):
        connections = defaultdict(int)
        for perm in combinations(self.valid_candidates_copy, 2):
            result = self.pairwise_comparison(perm[0], perm[1])
            if not result[perm[0]] == result[perm[1]]:
                if result[perm[0]] < result[perm[1]]:
                    connections[(perm[1], perm[0])] = result[perm[1]]
                else:
                    connections[(perm[0], perm[1])] = result[perm[0]]

        connect = sorted(connections, key=connections.get)
        connect.reverse()
        g = Graph.Graph([], directed=True)
        is_cycle = False
        for vertex in connect:
            g.add(vertex[0], vertex[1])
            if g.isCyclic():
                break

        return g.find_source()
# END OF VOTING METHODS

###################################################################################################################
#                                              HELPER FUNCTIONS                                                   #
###################################################################################################################

# Go through each ballot and look if first round is valid if not look if second round is valid and so on
# When it hits the first valid candidate in the ballot it will give all the votes to that candidate
    def distribute_preferences(self, valid_candidates):
        votes = defaultdict(int)
        for ballot in self.voteBreakdown_copy:
            ranking = ballot.candidateRanking
            for candidate in range(1, len(ranking) + 1):
                # Loop through each candidate in the ballot
                if ranking[candidate] in valid_candidates:
                    votes[ranking[candidate]] += ballot.percentage
                    break

        if not len(votes) == len(valid_candidates):
            # If a candidate is has no votes still add it with 0 votes
            for candidate in valid_candidates:
                if not candidate in votes:
                    votes[candidate] = 0
        return votes

    # Function that just returns the lowest candidate in a voting breakdown
    def find_lowest(self, breakdown):
        secondhighest = (min(breakdown, key=breakdown.get))
        return secondhighest

    # Helper function to find the two highest candidates
    def find_highest_two(self, breakdown):
        highest = (max(breakdown, key=breakdown.get))
        del breakdown[highest]
        secondhighest = (max(breakdown, key=breakdown.get))

        return (highest, secondhighest)

    # This function is used in votes where candidates have to get 50% it check if any candidate does
    def calc_to_fifty(self, breakdown):
        breakdown = self.find_total_percentage(breakdown)
        votes = defaultdict(int)
        # First calculates a total for each candidate
        for key in breakdown:
            votes[key] += breakdown[key]

        # Next sees if a candidate hits 50%
        for key in votes:
            if votes[key] >= 50:
                return True
        return False

    # Due to the nature of the borda count voting system it needs a different method to calculate the best candidate
    # to add
    def find_borda_add(self):
        out = {}
        for candidate_to_add in self.backup_candidates_copy:
            add_to = 0
            for candidate in self.valid_candidates_copy:
                if not candidate == self.candidateToWin:
                    candidate = self.find_candidate(candidate)

                    to_win_rank = candidate.CandidateSimilarity[self.candidateToWin]
                    added_rank = candidate.CandidateSimilarity[candidate_to_add]

                    add_to += to_win_rank - added_rank
                    out[candidate_to_add] = add_to

        maximum = max(out, key=out.get)
        return maximum

    # find the best candidate to remove, this is used for evey voting system
    def find_best_remove(self):
        num_of_cands = len(self.valid_candidates_copy)
        # This avoids a situation where there is only one candidate left
        if num_of_cands == 2:
            return ""

        storenewvals = defaultdict(int)
        for ballot in self.voteBreakdown_copy:
            # for candidate in self.candidates_copy:
            ranking = ballot.candidateRanking

            for cand in ranking:
                mathsvalue = 0
                if not ranking[cand] == self.candidateToWin:
                    # candidates with higher rankings are more preferable to remove from the ballot
                    # (num_of_cands - cand) ajusts for a higher ranking will be a low number
                    mathsvalue += (num_of_cands - cand) * ballot.percentage

                    storenewvals[ranking[cand]] += mathsvalue
        return max(storenewvals, key=storenewvals.get)


    # This method will remove a candidate from a ranked vote at the moment you do not need to pass it anything when is
    # is called as it will workout the best candidate to remove wile running
    def remove_candidate(self, candidate_to_remove):
        self.backup_candidates_copy.append(candidate_to_remove)
        for i in range(len(self.voteBreakdown_copy)):
            deleted = False
            ballot = self.voteBreakdown_copy[i]

            for cand in ballot.candidateRanking:
                # Delete the candidate when the correct candidate has been found
                if ballot.candidateRanking[cand] == candidate_to_remove:
                    deleted = True
                    del self.voteBreakdown_copy[i].candidateRanking[cand]
                    break

            if deleted:
                if len(self.voteBreakdown_copy[i].candidateRanking) == 0:
                    # If there was only one candidate on the ballot and the ballot is now empty
                    # assume they will vote for the most similar
                    highest = self.find_candidate(candidate_to_remove).highest(self.candidates)
                    self.voteBreakdown_copy[i].candidateRanking[1] = highest
                else:
                    # shift the rankings of all the candidates for other ballots so there is no gaps
                   ranking = self.rejig(self.voteBreakdown_copy[i].candidateRanking)
                   self.voteBreakdown_copy[i].candidateRanking = ranking



    def rejig(self, ranking):
        counter = 1
        newranking = {}
        for place in ranking:
            newranking[counter] = ranking[place]

            counter += 1

        return newranking

    def reset(self):
        # used to reset the values after running elections
        self.voteBreakdown_copy = copy.deepcopy(self.voteBreakdown)
        self.valid_candidates_copy = copy.deepcopy(self.valid_candidates)
        self.backup_candidates_copy = copy.deepcopy(self.backup_candidates)

    # Add the selected candidate to the ballot
    # The way a vote changes when a candidate is added a cetrain percentage of voters rank this candidate first
    # and another percentage just rank this candidate somewhere in their ballot.
    def add_candidate(self, candidate_to_add):
        return_ballot = []

        for vote in self.voteBreakdown_copy:
            votes_lost = 0
            first_candidate_similarity = self.find_candidate(vote.candidateRanking[1]).CandidateSimilarity
            added_candidate_similarity = first_candidate_similarity[candidate_to_add]
            if added_candidate_similarity > 0:
                # Firstly if the similarity between two candidates is > 0 then then a percentage (* 10 of the
                # similarity) puts this candidate first
                candidate_order = self.shift_ranks_down(vote.candidateRanking, 1)
                candidate_order[1] = candidate_to_add

                numbers_to_add = (vote.percentage * (added_candidate_similarity / 10))
                votes_lost = numbers_to_add
                vote_to_add = RankedBallot.RankedBallot(numbers_to_add, candidate_order)
                return_ballot.append(vote_to_add)
            counter = 1
            added = False

            # Next the number of candidates that ranks this candidate somewhere in their ballot needs to be
            # calculated
            for candidate in vote.candidateRanking:

                if vote.candidateRanking[candidate] in first_candidate_similarity:
                    # the method here is to go down the list and compare the similarity from the first ranked candidate
                    # to the added candidate and compare this with the similarity from the first candidate to the
                    # candidate in the nth position (going down the ranks). Whenever the added candidate rank is
                    # higher add that candidate there
                    if first_candidate_similarity[candidate_to_add] > first_candidate_similarity[vote.candidateRanking[candidate]]:
                        candidate_order = self.shift_ranks_down(vote.candidateRanking, counter)
                        candidate_order[counter] = candidate_to_add
                        numbers_to_add = (vote.percentage - votes_lost) * (first_candidate_similarity[candidate_to_add] / 10)
                        vote_to_add = RankedBallot.RankedBallot(numbers_to_add, candidate_order)
                        return_ballot.append(vote_to_add)
                        added = True
                        break

                counter += 1

            if added == False:
                return_ballot.append(RankedBallot.RankedBallot(vote.percentage - votes_lost, vote.candidateRanking))
            added = False
            counter = 1

        self.valid_candidates_copy.add(candidate_to_add)
        self.backup_candidates_copy.remove(candidate_to_add)
        self.voteBreakdown_copy = return_ballot


    # When a candidate is added in the to the ballot some candidates positions need to be shifted down
    def shift_ranks_down(self, candidate_order, pos_start):
        vote = {}

        for rank in candidate_order:
            if rank >= pos_start:
                vote[rank + 1] = candidate_order[rank]
            else:
                vote[rank] = candidate_order[rank]

        return vote


    # The candidates are given a percentage and not a number of votes so when a candidate is deleted the total votes
    # may not equal to 50 so this takes the results and recalculates the percentage that each candidate gets
    def find_total_percentage(self, results):
        total_votes = 0
        converted_votes = {}
        for candidate in results:
            total_votes += results[candidate]

        for candidate in results:
            percentage_won = (results[candidate] / total_votes) * 100
            added_votes = round(percentage_won, 0)
            converted_votes[candidate] = added_votes

        return converted_votes

    # Work out the results of a pairwise comparison between two candidates
    def pairwise_comparison(self, a, b):
        out = {a: 0.0, b: 0.0}

        for ballot in self.voteBreakdown_copy:
            for candidate in range(1, len(ballot.candidateRanking) + 1):
                cand = ballot.candidateRanking[candidate]
                if cand == a:
                    out[a] += ballot.percentage
                    break
                if cand == b:
                    out[b] += ballot.percentage
                    break

        results = self.find_total_percentage(out)

        return results

    # the best candidate to win in this type of voting method is one where
    def find_best_add(self, votes = None):
        backup_dict = defaultdict(int)
        candidate_to_win = self.find_candidate(self.candidateToWin)
        for backup_candidate in self.backup_candidates_copy:

            candidate_towin_added = candidate_to_win.CandidateSimilarity[backup_candidate]
            if candidate_towin_added == 0:
                for candidate in self.valid_candidates:
                    if not candidate == self.candidateToWin:
                        candidate_similarity = self.find_candidate(candidate).CandidateSimilarity

                        if candidate_towin_added > candidate_similarity[backup_candidate]:
                            backup_dict[backup_candidate] -= 1
                        else:
                            backup_dict[backup_candidate] += 1
        if len(backup_dict) == 0:
            return ""
        else:
            return max(backup_dict, key=backup_dict.get)

    def delete_backup(self, candidate):
        self.backup_candidates_copy.remove(candidate)

    def delete_valid(self, candidate):
        self.valid_candidates_copy.remove(candidate)



