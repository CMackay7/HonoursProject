from collections import defaultdict
class PluralityVoteRunner:

    def __init__(self, pluralityVote, add_remove):
        self.plurality_vote = pluralityVote
        self.add_remove_allowed = add_remove

    def run_election(self):
        return_dict = {}
        candidate_to_win = self.plurality_vote.candidateToWin


        fptp = self.run_fptp()
        if fptp[0] == candidate_to_win:
            return_dict.update(fptp[1])

        return return_dict


    def run_fptp(self):
        updates = defaultdict(str)
        json = {"fptp": {}}
        winner = self.plurality_vote.calc_winner()
        if self.add_remove_allowed == True:
            if winner == self.plurality_vote.candidateToWin:
                return winner, json
            else:
                # Loop adding candidates until you are out of candidates or your candidate has won
                loop_len = len(self.plurality_vote.backup_candidates_copy)
                for i in range(loop_len):
                    add = self.plurality_vote.best_to_add()
                    if add == "":
                        break
                    self.plurality_vote.add_candidate(add)
                    # store the fact that you have added the candidate
                    updates[add] = "added"
                    winner = self.plurality_vote.calc_winner()
                    if winner == self.plurality_vote.candidateToWin:
                        json["fptp"] = updates
                        return winner, json

                loop_len = len(self.plurality_vote.valid_candidates_copy)
                for loop in range(loop_len):
                    remove = self.plurality_vote.find_best_remove()
                    self.plurality_vote.remove_candidate(remove)
                    updates[remove] = "removed"
                    breakdown = self.plurality_vote.calc_winner()
                    winner = breakdown
                    if winner == self.plurality_vote.candidateToWin:
                        json["fptp"] = updates
                        return winner, json
        else:
            return winner, json

        return winner, json
