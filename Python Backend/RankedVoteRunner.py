from RankedVote import RankedVote
import operator

class RankedVoteRunner:

    def __init__(self, rankedVote, add_remove):
        self.ranked_vote = rankedVote
        self.add_remove_allowed = add_remove

    def run_election(self):
        return_dict = {}
        candidate_to_win = self.ranked_vote.candidateToWin
        if self.add_remove_allowed is False:
            runoff = self.run_instantrunoff()
            av_plus = self.run_avplus()
            borda = self.run_bordacount()
            copeland = self.run_copeland()
            minmax = self.run_minmax()
            rankedpairs = self.run_rankedpairs()
        else:
            runoff = self.run_instantrunnoff_true()

        if runoff[0] == candidate_to_win:
            return_dict.update(runoff[1])

        # if av_plus[0] == candidate_to_win:
        #     return_dict.update(av_plus[1])
        #
        # if borda[0] == candidate_to_win:
        #     return_dict.update(borda[1])
        #
        # if copeland[0] == candidate_to_win:
        #     return_dict.update(copeland[1])
        #
        # if minmax[0] == candidate_to_win:
        #     return_dict.update(minmax[1])
        #
        # if rankedpairs[0] == candidate_to_win:
        #     return_dict.update(rankedpairs[1])

        return return_dict


    def run_instantrunoff(self):
        updates = {}
        breakdown = self.ranked_vote.instantrunoffmethod()
        winner = max(breakdown, key=breakdown.get)
        json = {"IRN": updates}
        return winner, json

    def run_instantrunnoff_true(self):
        updates = {}
        json = {"IRN": {}}
        loop_len = len(self.ranked_vote.backup_candidates_copy)
        breakdown = self.ranked_vote.instantrunoffmethod()
        winner = max(breakdown, key=breakdown.get)
        if winner == self.ranked_vote.candidateToWin:
            return winner, json
        else:
            for loop in range(loop_len):
                add = "eddie"
                self.ranked_vote.add_candidate(add)
                updates[add] = "added"
                breakdown = self.ranked_vote.instantrunoffmethod()
                winner = max(breakdown, key=breakdown.get)
                if winner == self.ranked_vote.candidateToWin:
                    json["IRN"] = updates
                    return winner, json
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