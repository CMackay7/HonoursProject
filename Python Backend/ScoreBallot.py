# This class is just used to store information about score ballots
class ScoreBallot:
    percentage = 0

    # candidateScores takes the form of a dictionary of candidates and score e.g. ["a": 3, "b": 2]
    candidateScores = []

    def __init__(self, percentage, scores):
        self.percentage = percentage
        self.candidateScores = scores