from Vote import Vote

class PluralityVote(Vote):

    def __init__(self, candidates, voteBreakdown, backup_candidates, valid_candidates):
        super().__init__(candidates, voteBreakdown, backup_candidates, valid_candidates, valid_candidates[0])

    def BestFPTP(self):
    #winner = self.calc_winner(self.vote.voteBreakdown)

        while True:
            winner = self.calc_winner()
            if winner == self.candidateToWin:
                return self.voteBreakdown_copy
            else:
                if len(self.backup_candidates_copy) > 0:
                    if not self.best_to_add() == "":
                        self.add_candidate(self.best_to_add())
                    else:
                        return self.voteBreakdown_copy
                else:
                    return self.voteBreakdown_copy

    def calc_winner(self):
        winner = ""
        winning_votes = 0

        for candidate in self.valid_candidates_copy:
            if self.voteBreakdown_copy[candidate] > winning_votes:
                winner = candidate
                winning_votes = self.voteBreakdown_copy[candidate]

        return winner

    def best_to_add(self):
        bestcandidate = ""
        bestcandidatevotes = 0
        for backup_cand in self.backup_candidates_copy:
            currentmath = self.similarity_difference(backup_cand)
            if currentmath > bestcandidatevotes:
                bestcandidatevotes = currentmath
                bestcandidate = backup_cand
        print(bestcandidatevotes)
        return bestcandidate


    def best_to_remove(self):
        bestcandidate = ""
        bestcandidatevotes = 0
        for backupcand in self.backup_candidates_copy:
            print("")
            # TODO: implement this
            # currentmath = self.similarity_difference()

    # workout if it is worth addind a candidate
    # find the similarity from a candidate and the candidate to be added
    # minus the cost of the candidate you want to win to the candidate you are adding
    # if this is posative then it is worth adding the candidate
    def similarity_difference(self, backupcandidate):
        total = 0
        for candidate in self.valid_candidates_copy:
            if candidate != self.candidateToWin:
                candidate_obj = self.find_candidate(candidate)
                total += candidate_obj.CandidateSimilarity[backupcandidate] * self.voteBreakdown[candidate]

        candidate_to_win = self.find_candidate(self.candidateToWin)

        return total - candidate_to_win.CandidateSimilarity[backupcandidate] * self.voteBreakdown[self.candidateToWin]
