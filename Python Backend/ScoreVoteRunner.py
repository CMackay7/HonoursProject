from RankedVote import RankedVote
class ScoreVoteRunner:

    def __init__(self, score_vote, addremove_boolean):
        self.score_vote = score_vote
        self.can_add_remove = addremove_boolean

    def run_election(self):
        return_dict = {}
        candidate_to_win = self.score_vote.candidateToWin

        sumvote = self.run_sum_vote()
        if sumvote[0] == candidate_to_win:
            return_dict.update(sumvote[1])

        meanvote = self.run_mean_vote()
        if meanvote[0] == candidate_to_win:
            return_dict.update(meanvote[1])

        starvote = self.run_star_vote()
        if starvote[0] == candidate_to_win:
            return_dict.update(starvote[1])

        return return_dict

    def run_star_vote(self):
        updates = {"nil": "nil"}
        json = {"STR":updates}
        breakdown = self.score_vote.star_vote()
        winner = max(breakdown, key=breakdown.get)
        return winner, json

    def run_mean_vote(self):
        updates = {"nil": "nil"}
        json = {"MN": updates}
        breakdown = self.score_vote.mean_vote()
        winner = max(breakdown, key=breakdown.get)
        return winner, json

    def run_sum_vote(self):
        updates = {"nil": "nil"}
        json = {"SM": updates}
        breakdown = self.score_vote.sum_vote()
        winner = max(breakdown, key=breakdown.get)
        return winner, json
