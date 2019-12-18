from Vote import Vote
import copy
from collections import defaultdict


class RankedVote(Vote):

    # todo this probably needs to be changes to deep copy
    def __init__(self, candidates, voteBreakdown, backup_candidates, valid_candidates):
        super().__init__(candidates, voteBreakdown, backup_candidates, valid_candidates)
        self.candidates_copy = candidates.copy()
        self.voteBreakdown_copy = voteBreakdown.copy()
        self.backup_candidates_copy = backup_candidates.copy()
        self.valid_candidates_copy = copy.deepcopy(valid_candidates)
        print(self.voteBreakdown)

    def reset_values(self):
        self.candidates_copy = self.candidates.copy()
        self.voteBreakdown_copy = self.voteBreakdown.copy()
        self.backup_candidates_copy = self.backup_candidates.copy()

    def round_x(self, round):
        out = defaultdict(int)
        for vote in self.voteBreakdown_copy:
            if len(vote.candidateRanking) >= round:
                #cand = vote.candidateRanking[round]
                out[vote.candidateRanking[round]] += vote.percentage
        return out

# VOTING METHODS

    def instantrunoffmethod(self):
        round = 1
        votes = {}
        leave = False
        #valid_candidates = self.candidates_copy
        #votes = self.distribute_preferences(self.candidates_copy[1])
        while not leave:

            breakdown = self.distribute_preferences(self.valid_candidates_copy)

            if self.calc_to_fifty(breakdown):
                    leave = True

            if leave == False:
                lowest = self.find_lowest(breakdown)
                self.valid_candidates_copy.remove(lowest)

        self.valid_candidates_copy = copy.deepcopy(self.valid_candidates)
        return breakdown

    def av_plus(self):
        round = 1
        votes = {}
        leave = False

        breakdown = self.round_x(round)

        if self.calc_to_fifty(breakdown):
            return breakdown
        else:
            two_highest = self.find_highest_two(breakdown)
            votes = self.distribute_preferences(two_highest)
        self.reset()
        return votes

    def borda_count(self):
        n = len(self.candidates_copy)
        vote = defaultdict(int)
        for ballot in self.voteBreakdown_copy:
            ranking = ballot.candidateRanking
            for round in ranking:
                cand = ranking[round]
                vote[ranking[round]] += (n - (round - 1)) * ballot.percentage
        return vote

# END OF VOTING METHODS

    def find_lowest(self, breakdown):
        secondhighest = (min(breakdown, key=breakdown.get))
        return secondhighest

# Got through each ballot and look if first round is valid if not look if second round is valid and so on

    def distribute_preferences(self, valid_candidates):
        votes = defaultdict(int)
        for ballot in self.voteBreakdown_copy:
            ranking = ballot.candidateRanking
            for candidate in ranking:
                # todo change to array of candidates
                if ranking[candidate] in self.valid_candidates_copy:
                    votes[ranking[candidate]] += ballot.percentage
                    break

        if not len(votes) == len(valid_candidates):
            for candidate in valid_candidates:
                if not candidate in votes:
                    votes[candidate] = 0
        return votes



        #todo: havent changed this one i am going to see if i need it an possible remove it
    def distribute_preferences_ojs(self, valid_candidates):
        votes = defaultdict(int)
        for ballot in self.voteBreakdown_copy:
            ranking = ballot.candidateRanking
            for candidate in ranking:
                 # todo change to array of candidates
                if ranking[candidate].CandidateName in valid_candidates:
                    votes[ranking[candidate].CandidateName] += ballot.percentage
                    break
        return votes

    def find_highest_two(self, breakdown):
        highest = (max(breakdown, key=breakdown.get))
        del breakdown[highest]
        secondhighest = (max(breakdown, key=breakdown.get))

        return (highest, secondhighest)

    def calc_to_fifty(self, breakdown):
        votes = defaultdict(int)
        for key in breakdown:
            votes[key] += breakdown[key]
        for key in votes:
            if votes[key] > 50:
                return True
            else:
                return False


    # def remove_candidate(self, candidate_remove):
    #     shifting = False
    #     for ballot in self.voteBreakdown_copy:
    #         newballot = {}
    #         ranking = ballot.candidateRanking
    #         for cand in ranking:
    #             if ranking[cand].CandidateName == candidate_remove:
    #                 # This is the candidate that has been removed
    #
    #                 print()
    #             else:
    #                 # THis is not the candidate that has been removed
    #                 print()

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
                    self.voteBreakdown_copy[i].candidateRanking[1] = self.find_candidate_copy(highest)
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


    def find_candidate_copy(self, candidatename):
        for candidate in self.candidates_copy:
            if candidate.CandidateName == candidatename:
                return candidate



