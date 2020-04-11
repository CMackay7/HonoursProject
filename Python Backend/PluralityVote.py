# This is where all the processing of votes is done for the plurality vote

from Vote import Vote
from collections import defaultdict

class PluralityVote(Vote):

    def __init__(self, candidates, voteBreakdown, backup_candidates, valid_candidates, candidate_to_win):
        super().__init__(candidates, voteBreakdown, backup_candidates, valid_candidates, candidate_to_win)

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

    # Find the best candidate to add to the system
    def best_to_add(self):
        bestcandidate = ""
        bestcandidatevotes = 0

        # When adding a candidate you want the similarity between the added candidate and the candidate you want to win
        # to be low and the similarity betweem the candidate to be added and the candidate with the most
        # votes to be high.
        # This will result in a more votes taken away from the candidate with the highest votes
        for backup_cand in self.backup_candidates_copy:
            currentmath = self.similarity_difference(backup_cand)
            if currentmath > bestcandidatevotes:
                bestcandidatevotes = currentmath
                bestcandidate = backup_cand
        return bestcandidate

    # Find the best candidate to remove from the system
    def find_best_remove(self):
        # To avoid a situation where there is only one candidate on the ballot and therefore a default win
        # there has to be > 2 candidates for this code to run
        num_of_cands = len(self.valid_candidates_copy)
        if num_of_cands == 2:
            return ""

        storenewvals = defaultdict(int)
        for candidate in self.valid_candidates:
            # for candidate in self.candidates_copy:
            currcand_votes = self.voteBreakdown_copy[candidate]
            storenewvals[candidate] += currcand_votes
        # Returns the candidate with the highest votes
        return max(storenewvals, key=storenewvals.get)

    # workout if it is worth add a candidate
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
