class Vote:

    def __init__(self, candidates, voteBreakdown):
            self.candidates = candidates
            self.voteBreakdown = voteBreakdown

    def print_candidates(self):
        for candidate in self.candidates:
            print(candidate.CandidateName)


    def print_winner(self):
        winnerpercentage = 0
        for candidate in self.candidates:
            if self.voteBreakdown[candidate] > winnerpercentage:
                winnerpercentage = self.voteBreakdown[candidate]
                winner = candidate

        return winner
