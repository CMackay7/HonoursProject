from Vote import Vote
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

#if __name__ == "__main__":
#    ranked = RankedVote(["dsfvds"], "sgrfv", "afesfsdv")

