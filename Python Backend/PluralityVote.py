class PluralityVote:

    def __init__(self, vote):
        self.vote = vote

    def BestFPTP(self):



    def  calc_winner(self, votebreakdown):
        winner = ""
        winning_votes = 0

        for candidate in votebreakdown:
            if votebreakdown[candidate] > winning_votes:
                winner = candidate
                winning_votes = votebreakdown[candidate]

        return winner

