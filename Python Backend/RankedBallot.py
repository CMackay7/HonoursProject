# Object used to store the information about the ranked ballots
class RankedBallot:
    percentage = 0
    candidateRanking = []

    def __init__(self, percentage, ranking):
        self.percentage = percentage
        self.candidateRanking = ranking




