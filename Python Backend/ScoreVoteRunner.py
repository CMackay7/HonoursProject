from RankedVote import RankedVote
class ScoreVoteRunner:

    def __init__(self, score_vote, addremove_boolean):
        self.score_vote = score_vote
        self.can_add_remove = addremove_boolean

    def run_election(self):
        return_dict = {}
        candidate_to_win = self.score_vote.candidateToWin

        sumvote = self.run_sum_vote()
        if sumvote == candidate_to_win:
            return_dict.update({"SMV": ""})

        meanvote = self.run_mean_vote()
        if meanvote == candidate_to_win:
            return_dict.update({"MNV": ""})

        starvote = self.run_star_vote()
        if starvote == candidate_to_win:
            return_dict.update({"STR": ""})

        return return_dict

    def run_star_vote(self):
        breakdown = self.score_vote.star_vote()
        winner = max(breakdown, key=breakdown.get)
        return winner

    def run_mean_vote(self):
        breakdown = self.score_vote.mean_vote()
        winner = max(breakdown, key=breakdown.get)
        return winner

    def run_sum_vote(self):
        breakdown = self.score_vote.sum_vote()
        winner = max(breakdown, key=breakdown.get)
        return winner



