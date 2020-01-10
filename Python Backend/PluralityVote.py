import Vote

class PluralityVote(Vote):

    def __init__(self, candidates, voteBreakdown, backup_candidates, valid_candidates):
        super().__init__(candidates, voteBreakdown, backup_candidates, valid_candidates, valid_candidates[0])

    def BestFPTP(self):
    #winner = self.calc_winner(self.vote.voteBreakdown)

        while True:
            winner = self.calc_winner(self.vote.voteBreakdown)
            if winner == self.vote.candidateToWin:
                return self.vote.voteBreakdown
            else:
                if len(self.vote.backup_candidates) > 0:
                    self.vote.add_candidate(self.best_to_add())
                else:
                    return self.vote.voteBreakdown

    def calc_winner(self, votebreakdown):
        winner = ""
        winning_votes = 0

        for candidate in votebreakdown:
            if votebreakdown[candidate] > winning_votes:
                winner = candidate
                winning_votes = votebreakdown[candidate]

        return winner

    def best_to_add(self):
        bestcandidate = ""
        bestcandidatevotes = 0
        for backup_cand in self.vote.backup_candidates:
            currentmath = self.similarity_difference(backup_cand)
            if currentmath > bestcandidatevotes:
                bestcandidatevotes = currentmath
                bestcandidate = backup_cand
        print(bestcandidatevotes)
        return bestcandidate


    def best_to_remove(self):
        bestcandidate = ""
        bestcandidatevotes = 0
        for backupcand in self.vote.backup_candidates:
            print("")
            # TODO: implement this
            # currentmath = self.similarity_difference()

    def similarity_difference(self, backupcandidate):
        total = 0
        for candidate in self.vote.candidates:
            if candidate != self.vote.candidateToWin:
                total += candidate.CandidateSimilarity[backupcandidate.CandidateName] * self.vote.voteBreakdown[candidate]

        return total - self.vote.candidateToWin.CandidateSimilarity[backupcandidate.CandidateName] * self.vote.voteBreakdown[self.vote.candidateToWin]
