import copy

class Vote:

    def __init__(self, candidates, voteBreakdown, backup_candidates, valid_candidates, candidate_to_win):
            self.candidates = candidates
            self.voteBreakdown = voteBreakdown
            self.backup_candidates = backup_candidates
            self.candidateToWin = candidate_to_win
            self.valid_candidates = valid_candidates

            self.voteBreakdown_copy = copy.deepcopy(voteBreakdown)
            self.backup_candidates_copy = copy.deepcopy(backup_candidates)
            self.valid_candidates_copy = copy.deepcopy(valid_candidates)

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

# todo fix candidatecopy not in vote
    def find_candidate(self, candidatename):
        for candidate in self.candidates:
            if candidate.CandidateName == candidatename:
                return candidate
