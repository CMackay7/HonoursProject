from RankedVote import RankedVote
import operator

class RankedVoteRunner:

    def __init__(self, rankedVote, add_remove):
        self.ranked_vote = rankedVote
        self.add_remove_allowed = add_remove
        self.add_order = self.best_add_order()

    def best_add_order(self):
        loop_length = len(self.ranked_vote.backup_candidates_copy)

        returndict = []

        for i in range(loop_length):
            add = self.ranked_vote.find_best_add()
            if add == "":
                break
            returndict.append(add)
            self.ranked_vote.delete_backup(add)

        return returndict



    def run_election(self):
        return_dict = {}
        candidate_to_win = self.ranked_vote.candidateToWin
        if self.add_remove_allowed is False:
            runoff = self.run_instantrunoff()
            if runoff == candidate_to_win:
                return_dict.update({"IRN":""})
            av_plus = self.run_avplus()
            if av_plus == candidate_to_win:
                return_dict.update({"AVP": ""})
            borda = self.run_bordacount()
            if borda == candidate_to_win:
                return_dict.update({"BC":""})
            copeland = self.run_copeland()
            if copeland == candidate_to_win:
                return_dict.update({"CPLN":""})
            minmax = self.run_minmax()
            if minmax == candidate_to_win:
                return_dict.update({"MNX":""})
            rankedpairs = self.run_rankedpairs()
            if rankedpairs == candidate_to_win:
                return_dict.update({"RP":""})
        else:
            runoff = self.run_instantrunnoff_true()
            self.ranked_vote.reset()
            if runoff[0] == candidate_to_win:
                return_dict.update(runoff[1])

            avplus = self.run_avplus_true()
            self.ranked_vote.reset()
            if avplus[0] == candidate_to_win:
                return_dict.update(avplus[1])

            borda = self.run_boardacount_true()
            self.ranked_vote.reset()
            if borda[0] == candidate_to_win:
                return_dict.update(borda[1])

            copeland = self.run_copeland_true()
            self.ranked_vote.reset()
            if copeland[0] == candidate_to_win:
                return_dict.update(copeland[1])

            minmax = self.run_minmax_true()
            self.ranked_vote.reset()
            if minmax[0] == candidate_to_win:
                return_dict.update(minmax[1])

            rankedpairs = self.run_rankedpairs_true()
            self.ranked_vote.reset()
            if rankedpairs[0] == candidate_to_win:
                return_dict.update(rankedpairs[1])

        return return_dict


    def run_instantrunoff(self):
        updates = {}
        breakdown = self.ranked_vote.instantrunoffmethod()
        winner = max(breakdown, key=breakdown.get)
        return winner

    def run_instantrunnoff_true(self):
        updates = {}
        json = {"IRN": {}}
        loop_len = len(self.add_order)
        breakdown = self.ranked_vote.instantrunoffmethod()
        winner = max(breakdown, key=breakdown.get)
        if winner == self.ranked_vote.candidateToWin:
            return winner, json
        else:
            for loop in range(loop_len):
                add = self.add_order[loop]
                self.ranked_vote.add_candidate(add)
                updates[add] = "added"
                breakdown = self.ranked_vote.instantrunoffmethod()
                winner = max(breakdown, key=breakdown.get)
                if winner == self.ranked_vote.candidateToWin:
                    json["IRN"] = updates
                    return winner, json
        return winner, json

    def run_avplus(self):


        breakdown = self.ranked_vote.av_plus()
        winner = max(breakdown, key=breakdown.get)

        return winner

    def run_avplus_true(self):
        updates = {}
        json = {"AVP": {}}
        loop_len = len(self.add_order)
        breakdown = self.ranked_vote.av_plus()
        winner = max(breakdown, key=breakdown.get)
        if winner == self.ranked_vote.candidateToWin:
            return winner, json
        else:
            for loop in range(loop_len):
                add = self.add_order[loop]
                self.ranked_vote.add_candidate(add)
                updates[add] = "added"
                breakdown = self.ranked_vote.av_plus()
                winner = max(breakdown, key=breakdown.get)
                if winner == self.ranked_vote.candidateToWin:
                    json["AVP"] = updates
                    return winner, json
        return winner, json

    def run_bordacount(self):
        json = {"election": "BC"}
        breakdown = self.ranked_vote.borda_count()
        winner = max(breakdown, key=breakdown.get)

        return winner, json

    def run_boardacount_true(self):
        updates = {}
        json = {"BC": {}}
        loop_len = len(self.add_order)
        breakdown = self.ranked_vote.borda_count()
        winner = max(breakdown, key=breakdown.get)
        if winner == self.ranked_vote.candidateToWin:
            return winner, json
        else:
            for loop in range(loop_len):
                add = self.ranked_vote.find_borda_add()
                self.ranked_vote.add_candidate(add)
                updates[add] = "added"
                breakdown = self.ranked_vote.borda_count()
                winner = max(breakdown, key=breakdown.get)
                if winner == self.ranked_vote.candidateToWin:
                    json["BC"] = updates
                    return winner, json
        return winner, json

    def run_copeland(self):
        updates = {"nil": "nil"}
        json = {"CPLN": updates}
        breakdown = self.ranked_vote.copeland_method()
        if len(breakdown) <= 0:
            return ""
        winner = max(breakdown, key=breakdown.get)

        return winner, json

    def run_copeland_true(self):
        updates = {}
        json = {"CPLN": {}}
        loop_len = len(self.add_order)
        breakdown = self.ranked_vote.copeland_method()
        if len(breakdown) > 0:
            winner = max(breakdown, key=breakdown.get)
        else:
            return "", json

        if winner == self.ranked_vote.candidateToWin:
            return winner, json
        else:
            for loop in range(loop_len):
                add = self.add_order[loop]
                self.ranked_vote.add_candidate(add)
                updates[add] = "added"
                breakdown = self.ranked_vote.copeland_method()
                winner = max(breakdown, key=breakdown.get)
                if winner == self.ranked_vote.candidateToWin:
                    json["CPLN"] = updates
                    return winner, json
        return winner, json

    def run_minmax(self):
        updates = {"nil": "nil"}
        json = {"MNX": updates}
        breakdown = self.ranked_vote.minmax_method()
        winner = max(breakdown, key=breakdown.get)

        return winner, json

    def run_minmax_true(self):
        updates = {}
        json = {"MNX": {}}
        loop_len = len(self.add_order)
        breakdown = self.ranked_vote.minmax_method()
        winner = min(breakdown, key=breakdown.get)
        if winner == self.ranked_vote.candidateToWin:
            return winner, json
        else:
            for loop in range(loop_len):
                add = self.add_order[loop]
                self.ranked_vote.add_candidate(add)
                updates[add] = "added"
                breakdown = self.ranked_vote.minmax_method()
                winner = min(breakdown, key=breakdown.get)
                if winner == self.ranked_vote.candidateToWin:
                    json["MNX"] = updates
                    return winner, json
        return winner, json

    def run_rankedpairs(self):
        updates = {"nil": "nil"}
        json = {"RP": updates}
        winner = self.ranked_vote.ranked_pairs()
        return winner, json

    def run_rankedpairs_true(self):
        updates = {}
        json = {"RP": {}}
        loop_len = len(self.add_order)
        breakdown = self.ranked_vote.ranked_pairs()
        winner = breakdown #max(breakdown, key=breakdown.get)
        if winner == self.ranked_vote.candidateToWin:
            return winner, json
        else:
            for loop in range(loop_len):
                add = self.add_order[loop]
                self.ranked_vote.add_candidate(add)
                updates[add] = "added"
                breakdown = self.ranked_vote.ranked_pairs()
                winner = breakdown #max(breakdown, key=breakdown.get)
                if winner == self.ranked_vote.candidateToWin:
                    json["RP"] = updates
                    return winner, json
        return winner, json