class Vote:

    def __init__(self, candidates, voteBreakdown, backup_candidates, valid_candidates):
            self.candidates = candidates
            self.voteBreakdown = voteBreakdown
            self.backup_candidates = backup_candidates
            self.candidateToWin = valid_candidates[0]
            self.valid_candidates = valid_candidates

    def print_candidates(self):
        for candidate in self.candidates:
            print(candidate.CandidateName)

    def print_breakdown(self):
        for candidate in self.voteBreakdown:
            print(candidate.CandidateName + " has: " + str(self.voteBreakdown[candidate]) + " votes!")

    def print_winner(self):
        winnerpercentage = 0
        for candidate in self.candidates:
            if self.voteBreakdown[candidate] > winnerpercentage:
                winnerpercentage = self.voteBreakdown[candidate]
                winner = candidate

        return winner

    def add_candidate(self, candidate_added):
        total_votes = 0
        for candidate in self.voteBreakdown:
            votes_lost = candidate.candidate_added(candidate_added.CandidateName, self.voteBreakdown[candidate])
            total_votes += votes_lost
            self.voteBreakdown[candidate] -= votes_lost

        self.voteBreakdown[candidate_added] = total_votes
        self.backup_candidates.remove(candidate_added)

    def remove_candidate(self, candidate_removed):
        tosend = set(self.candidates).difference(self.backup_candidates)
        vote_change_profile = candidate_removed.candidate_removed(self.voteBreakdown[candidate_removed], tosend)

        for candidate in self.candidates:
            if candidate != candidate_removed:
                votes_lost = vote_change_profile[candidate.CandidateName]
                self.voteBreakdown[candidate] += votes_lost

        del self.voteBreakdown[candidate_removed]
        self.backup_candidates.add(candidate_removed)


# todo fix candidatecopy not in vote
    def find_candidate(self, candidatename):
        for candidate in self.candidates:
            if candidate.CandidateName == candidatename:
                return candidate
