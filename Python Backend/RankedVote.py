from Vote import Vote
import copy
from collections import defaultdict
import RankedBallot
from itertools import combinations
import Graph

class RankedVote(Vote):
    # Candidates is the only one of these which contains the actual objects do not modify or copy
    def __init__(self, candidates, voteBreakdown, backup_candidates, valid_candidates):
        super().__init__(candidates, voteBreakdown, backup_candidates, valid_candidates, valid_candidates[0])

    # Return the number of votes each candidate got in the specified round
    def round_x(self, round):
        out = defaultdict(int)
        for vote in self.voteBreakdown_copy:
            if len(vote.candidateRanking) >= round:
                out[vote.candidateRanking[round]] += vote.percentage
        return out

# VOTING METHODS

    # The instant run off method will remove the lowest candidate and distribute their preferences until someone has 50%
    # This process is done one at a time
    def instantrunoffmethod(self):
        leave = False
        #self.candidateToWin
        while not leave:
            breakdown = self.distribute_preferences(self.valid_candidates_copy)
            breakdown = self.find_total_percentage(breakdown)

            if self.calc_to_fifty(breakdown):
                    leave = True

            if leave == False:
                lowest = self.find_lowest(breakdown)
                self.valid_candidates_copy.remove(lowest)

        self.valid_candidates_copy = copy.deepcopy(self.valid_candidates)
        self.reset()
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
        self.reset()
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
        self.reset()
        return vote

# END OF VOTING METHODS

    def find_lowest(self, breakdown):
        secondhighest = (min(breakdown, key=breakdown.get))
        return secondhighest

# Got through each ballot and look if first round is valid if not look if second round is valid and so on
# When it hits the first valid candidate in the ballot it will give all the votes to that candidate
    def distribute_preferences(self, valid_candidates):
        votes = defaultdict(int)
        counter = 1
        for ballot in self.voteBreakdown_copy:
            ranking = ballot.candidateRanking
            for candidate in range(1, len(ranking) + 1):
                if ranking[candidate] in valid_candidates:
                    votes[ranking[candidate]] += ballot.percentage
                    break

        if not len(votes) == len(valid_candidates):
            for candidate in valid_candidates:
                if not candidate in votes:
                    votes[candidate] = 0
        return votes

    def find_highest_two(self, breakdown):
        highest = (max(breakdown, key=breakdown.get))
        del breakdown[highest]
        secondhighest = (max(breakdown, key=breakdown.get))

        return (highest, secondhighest)

    def calc_to_fifty(self, breakdown):
        breakdown = self.find_total_percentage(breakdown)
        votes = defaultdict(int)
        for key in breakdown:
            votes[key] += breakdown[key]
        for key in votes:
            if votes[key] >= 50:
                return True
        return False

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
        return maximum, out[maximum]

    def find_best_remove(self):
        num_of_cands = len(self.valid_candidates_copy)
        storenewvals = defaultdict(int)
        for ballot in self.voteBreakdown_copy:
            # for candidate in self.candidates_copy:
            ranking = ballot.candidateRanking

            for cand in ranking:
                mathsvalue = 0
                if not ranking[cand] == self.candidateToWin:
                    mathsvalue += (num_of_cands - cand) * ballot.percentage

                    storenewvals[ranking[cand]] += mathsvalue
        return max(storenewvals, key=storenewvals.get)

    # todo Removed passing the candidate to remove into the function should probably add it back later

    # This method will remove a candidate from a ranked vote at the moment you do not need to pass it anything when is
    # is called as it will workout the best candidate to remove wile running
    def remove_candidate(self):
        candidate_to_remove = self.find_best_remove()
       # changeable_vote = copy.deepcopy(self.voteBreakdown_copy)
        #self.candidates_copy = filter(lambda x: x.CandidateName != candidate_to_remove.CandidateName, self.candidates_copy)
        self.backup_candidates_copy.append(candidate_to_remove)
        for i in range(len(self.voteBreakdown_copy)):
            deleted = False
            ballot = self.voteBreakdown_copy[i]
            for cand in ballot.candidateRanking:
                if ballot.candidateRanking[cand] == candidate_to_remove:
                    deleted = True
                    del self.voteBreakdown_copy[i].candidateRanking[cand]
                    break

            if deleted:
                if len(self.voteBreakdown_copy[i].candidateRanking) == 0:
                    highest = self.find_candidate(candidate_to_remove).highest(self.candidates)
                    self.voteBreakdown_copy[i].candidateRanking[1] = highest
                    print("do that shit here boyo")
                else:
                   ranking = self.rejig(self.voteBreakdown_copy[i].candidateRanking)
                   self.voteBreakdown_copy[i].candidateRanking = ranking

        #self.voteBreakdown_copy = changeable_vote


    def rejig(self, ranking):
        counter = 1
        newranking = {}
        for place in ranking:
            if not place == counter:
                newranking[counter - 1] = ranking[place]
            else:
                newranking[counter] = ranking[place]

            counter += 1

        return newranking

    def reset(self):
        self.voteBreakdown_copy = copy.deepcopy(self.voteBreakdown)
        self.valid_candidates_copy = copy.deepcopy(self.valid_candidates)
        self.backup_candidates_copy = copy.deepcopy(self.backup_candidates)


    # def find_candidate_copy(self, candidatename):
    #     for candidate in self.candida:
    #         if candidate.CandidateName == candidatename:
    #             return candidate


    def add_candidate(self, candidate_to_add):
       # candidate_to_add = self.backup_candidates_copy[0]
        return_ballot = []

        for vote in self.voteBreakdown_copy:
            votes_lost = 0
            first_candidate_similarity = self.find_candidate(vote.candidateRanking[1]).CandidateSimilarity
            added_candidate_similarity = first_candidate_similarity[candidate_to_add]
            if added_candidate_similarity > 0:
                candidate_order = self.shift_ranks_down(vote.candidateRanking, 1)
                candidate_order[1] = candidate_to_add

                numbers_to_add = (vote.percentage * (added_candidate_similarity / 10))
                votes_lost = numbers_to_add
                vote_to_add = RankedBallot.RankedBallot(numbers_to_add, candidate_order)
                #updated_vote = RankedBallot.RankedBallot(vote.percentage - numbers_to_add, vote.candidateRanking)
                return_ballot.append(vote_to_add)
                #return_ballot.append(updated_vote)
            counter = 1
            added = False
            for candidate in vote.candidateRanking:

                if vote.candidateRanking[candidate] in first_candidate_similarity:
                    if first_candidate_similarity[candidate_to_add] > first_candidate_similarity[vote.candidateRanking[candidate]]:
                        candidate_order = self.shift_ranks_down(vote.candidateRanking, counter)
                        candidate_order[counter] = candidate_to_add
                        numbers_to_add = (vote.percentage - votes_lost)# * (first_candidate_similarity / 10))
                        vote_to_add = RankedBallot.RankedBallot(numbers_to_add, candidate_order)
                        return_ballot.append(vote_to_add)
                        added = True
                        break

                counter += 1

            if added == False:
                return_ballot.append(RankedBallot.RankedBallot(vote.percentage - votes_lost, vote.candidateRanking))
            added = False
            counter = 1

        self.valid_candidates_copy.append(candidate_to_add)
        self.backup_candidates_copy.remove(candidate_to_add)
        self.voteBreakdown_copy = return_ballot



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
        out = defaultdict(int)
        #counter = 1
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

    def find_best_add(self, votes = None):
        backup_dict = defaultdict(int)
        candidate_to_win = self.find_candidate(self.candidateToWin)
        for backup_candidate in self.backup_candidates_copy:
            #backup_candidate_similarity = self.find_candidate(backup_candidate).candidateSimilarity
            candidate_towin_added = candidate_to_win.CandidateSimilarity[backup_candidate]
            if candidate_towin_added == 0:
                for candidate in self.valid_candidates:
                    if not candidate == self.candidateToWin:
                        candidate_similarity = self.find_candidate(candidate).CandidateSimilarity

                        if candidate_towin_added > candidate_similarity[backup_candidate]:
                            backup_dict[backup_candidate] -= 1
                        else:
                            backup_dict[backup_candidate] += 1
        return max(backup_dict, key=backup_dict.get)







    #todo finish and test this code
    def ranked_pairs(self):
        connections = defaultdict(int)
        for perm in combinations(self.valid_candidates, 2):
            result = self.pairwise_comparison(perm[0], perm[1])
            if not result[perm[0]] == result[perm[1]]:
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

