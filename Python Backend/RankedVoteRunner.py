from RankedVote import RankedVote
import operator

class RankedVoteRunner:

    def __init__(self, rankedVote, add_remove):
        self.ranked_vote = rankedVote
        self.add_remove_allowed = add_remove

    def run_election(self):
        return_dict = {}
        candidate_to_win = self.ranked_vote.candidateToWin

        runoff = self.run_instantrunoff()
        if runoff[0] == candidate_to_win:
            return_dict.update(runoff[1])

        av_plus = self.run_avplus()
        if av_plus[0] == candidate_to_win:
            return_dict.update(av_plus[1])

        borda = self.run_bordacount()
        if borda[0] == candidate_to_win:
            return_dict.update(borda[1])

        copeland = self.run_copeland()
        if copeland[0] == candidate_to_win:
            return_dict.update(copeland[1])

        minmax = self.run_minmax()
        if minmax[0] == candidate_to_win:
            return_dict.update(minmax[1])

        rankedpairs = self.run_rankedpairs()
        if rankedpairs[0] == candidate_to_win:
            return_dict.update(rankedpairs[1])

        return return_dict


    def run_instantrunoff(self):
        updates = {"nil": "nil"}
        json = {"IRN": updates}
        breakdown = self.ranked_vote.instantrunoffmethod()
        winner = max(breakdown, key=breakdown.get)

        return winner, json

    def run_avplus(self):
        updates = {"nil": "nil"}
        json = {"AVP": updates}
        breakdown = self.ranked_vote.av_plus()
        winner = max(breakdown, key=breakdown.get)

        return winner, json

    def run_bordacount(self):
        json = {"election": "BC"}
        breakdown = self.ranked_vote.borda_count()
        winner = max(breakdown, key=breakdown.get)

        return winner, json

    def run_copeland(self):
        updates = {"nil": "nil"}
        json = {"CPLN": updates}
        breakdown = self.ranked_vote.copeland_method()
        winner = max(breakdown, key=breakdown.get)

        return winner, json

    def run_minmax(self):
        updates = {"nil": "nil"}
        json = {"MNX": updates}
        breakdown = self.ranked_vote.minmax_method()
        winner = max(breakdown, key=breakdown.get)

        return winner, json

    def run_rankedpairs(self):
        updates = {"nil": "nil"}
        json = {"RP": updates}
        winner = self.ranked_vote.ranked_pairs()
        return winner, json