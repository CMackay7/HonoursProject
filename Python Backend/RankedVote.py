from Vote import Vote
import copy


class RankedVote(Vote):

    def __init__(self, candidates, voteBreakdown, backup_candidates):
        super().__init__(candidates, voteBreakdown, backup_candidates)
        self.candidates_copy = candidates.copy()
        self.voteBreakdown_copy = voteBreakdown.copy()
        self.backup_candidates_copy = backup_candidates.copy()
        print(self.voteBreakdown)

    def reset_values(self):
        self.candidates_copy = self.candidates.copy()
        self.voteBreakdown_copy = self.voteBreakdown.copy()
        self.backup_candidates_copy = self.backup_candidates.copy()

    def round_x(self, round):
        out = {}
        for vote in self.voteBreakdown:
            if len(vote.candidateRanking) >= round:
                cand = vote.candidateRanking[round]
                if cand in out:
                    out[vote.candidateRanking[round]] += vote.percentage
                else:
                    out[vote.candidateRanking[round]] = vote.percentage

        return out

# VOTING METHODS

    def instantrunoffmethod(self):
        round = 1
        votes = {}
        leave = False
        valid_candidates = self.candidates_copy
        #votes = self.distribute_preferences(self.candidates_copy[1])
        while not leave:

            breakdown = self.distribute_preferences(valid_candidates)

            if self.calc_to_fifty(breakdown):
                    leave = True

            if leave == False:
                lowest = self.find_lowest(breakdown)
                valid_candidates.remove(lowest)
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

        return votes

    def borda_count(self):
        n = len(self.candidates_copy)
        vote = {}
        for ballot in self.voteBreakdown_copy:
            ranking = ballot.candidateRanking
            for round in ranking:
                cand = ranking[round]
                if cand in vote:
                    vote[ranking[round]] += (n - (round - 1)) * ballot.percentage
                else:
                    vote[ranking[round]] = (n - (round - 1)) * ballot.percentage

        return vote

# END OF VOTING METHODS

    def find_lowest(self, breakdown):
        secondhighest = (min(breakdown, key=breakdown.get))
        return secondhighest

# Got through each ballot and look if first round is valid if not look if second round is valid and so on

    def distribute_preferences(self, valid_candidates):
        votes = {}
        for ballot in self.voteBreakdown_copy:
            ranking = ballot.candidateRanking
            for candidate in ranking:
                # todo change to array of candidates
                if ranking[candidate] in valid_candidates:
                    if ranking[candidate] in votes:
                        votes[ranking[candidate]] += ballot.percentage
                        break
                    else:
                        votes[ranking[candidate]] = ballot.percentage
                        break
        return votes

    def find_highest_two(self, breakdown):
        highest = (max(breakdown, key=breakdown.get))
        del breakdown[highest]
        secondhighest = (max(breakdown, key=breakdown.get))

        return (highest, secondhighest)

    def calc_to_fifty(self, breakdown):
        votes = {}
        for key in breakdown:
            if key in votes:
                votes[key] += breakdown[key]
            else:
                votes[key] = breakdown[key]
        for key in votes:
            if votes[key] > 50:
                return True
            else:
                return False


    def remove_candidate(self, candidate_remove):
        shifting = False
        for ballot in self.voteBreakdown_copy:
            newballot = {}
            ranking = ballot.candidateRanking
            for cand in ranking:
                if ranking[cand].CandidateName == candidate_remove:
                    # This is the candidate that has been removed

                    print()
                else:
                    # THis is not the candidate that has been removed
                    print()

    def find_borda_add(self):
        out = {}
        for candidate_to_add in self.backup_candidates_copy:
            add_to = 0
            for candidate in self.candidates_copy:
                if not candidate == self.candidateToWin:
                    to_win_rank = candidate.CandidateSimilarity[self.candidateToWin.CandidateName]
                    added_rank = candidate.CandidateSimilarity[candidate_to_add.CandidateName]

                    add_to += to_win_rank - added_rank
                    out[candidate_to_add] = add_to

        maximum = max(out, key=out.get)
        return maximum, out[maximum]

    def find_best_remove(self):
        num_of_cands = len(self.candidates_copy)
        storenewvals = {}
        for ballot in self.voteBreakdown_copy:
            # for candidate in self.candidates_copy:
            ranking = ballot.candidateRanking

            for cand in ranking:
                mathsvalue = 0
                if not ranking[cand] == self.candidateToWin:
                    mathsvalue += (num_of_cands - cand) * ballot.percentage

                    if ranking[cand] in storenewvals:
                        storenewvals[ranking[cand]] += mathsvalue
                    else:
                        storenewvals[ranking[cand]] = mathsvalue
        return max(storenewvals, key=storenewvals.get)

    # todo Removed passing the candidate to remove into the function should probably add it back later

    # This method will remove a candidate from a ranked vote at the moment you do not need to pass it anything when is
    # is called as it will workout the best candidate to remove wile running
    def remove_candidate(self):
        candidate_to_remove = self.find_best_remove()
        changeable_vote = copy.deepcopy(self.voteBreakdown_copy)
        for i in range(len(self.voteBreakdown_copy)):
            deleted = False
            ballot = self.voteBreakdown_copy[i]
            for cand in ballot.candidateRanking:
                if ballot.candidateRanking[cand] == candidate_to_remove:
                    deleted = True
                    del changeable_vote[i].candidateRanking[cand]

            if deleted:
                if len(changeable_vote[i].candidateRanking) <= 1:
                    print("do that shit here boyo")
                else:
                    ranking = self.rejig(changeable_vote[i].candidateRanking)
                    changeable_vote[i].candidateRanking = ranking

        self.voteBreakdown_copy = changeable_vote


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




