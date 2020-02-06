from collections import defaultdict
class PluralityVoteRunner:

    def __init__(self, pluralityVote, add_remove):
        self.plurality_vote = pluralityVote
        self.add_remove_allowed = add_remove

    def run_election(self):
        return_dict = {}
        candidate_to_win = self.score_vote.candidateToWin


        fptp = self.run_fptp()
        if fptp[0] == candidate_to_win:
            return_dict["fptp"] = fptp[1]

        return return_dict


    def run_fptp(self):
        updates = defaultdict(str)
        json = {"IRN": {}}
        winner = self.plurality_vote.calc_winner()
        if self.add_remove_allowed == True:
            if winner == self.plurality_vote.candidateToWin:
                return winner, json
            else:
                # Loop adding candidates until you are out of candidates or your candidate has won
                loop_len = len(self.plurality_vote.backup_candidates_copy) - 1
                for i in range(loop_len):
                    add = self.plurality_vote.best_to_add()
                    self.plurality_vote.add_candidate(add)
                    # store the fact that you have added the candidate
                    updates[add] = "added"
                    winner = self.plurality_vote.calc_winner()
                    if winner == self.plurality_vote.candidateToWin:
                        json["IRN"] = updates
                        return winner, json
        else:
            return winner, json

        return winner, json
