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

    def add_candidate(self, candidate_added):
        total_votes = 0
        candidate_obj = self.find_candidate(candidate_added)
        for candidate in self.valid_candidates_copy:
            curr_candidate_obj = self.find_candidate(candidate)
            votes_lost = curr_candidate_obj.candidate_added(candidate_added, self.voteBreakdown[candidate])
            total_votes += votes_lost
            self.voteBreakdown_copy[candidate] -= votes_lost

        self.voteBreakdown_copy[candidate_added] = total_votes
        self.backup_candidates_copy.remove(candidate_added)

    def remove_candidate(self, candidate_removed):
        tosend = set(self.valid_candidates).difference(self.backup_candidates)
        candidate_removed_obj = self.find_candidate(candidate_removed)
        vote_change_profile = candidate_removed_obj.candidate_removed(self.voteBreakdown[candidate_removed], tosend)

        if vote_change_profile == 0:
            del self.voteBreakdown_copy[candidate_removed]

        else:
            for candidate in self.candidates:
                if candidate != candidate_removed:
                    votes_lost = vote_change_profile[candidate]
                    self.voteBreakdown_copy[candidate] += votes_lost

            del self.voteBreakdown_copy[candidate_removed]
            self.backup_candidates_copy.add(candidate_removed)


# todo fix candidatecopy not in vote
    def find_candidate(self, candidatename):
        for candidate in self.candidates:
            if candidate.CandidateName == candidatename:
                return candidate
