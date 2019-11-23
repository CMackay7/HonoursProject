class Candidate:

    # CLASS VARIABLES
    CandidateName = ""
    CandidateSimilarity = []

    def __init__(self, CandidateNameIn, CandidateSimilarityIn):
        self.CandidateName = CandidateNameIn
        self.CandidateSimilarity = CandidateSimilarityIn

    # METHODS
    def candidate_added(self, candidate_name, number_of_voters):
        likeness = self.CandidateSimilarity[candidate_name]
        votes_lost = number_of_voters * (likeness / float(10))
        return int(votes_lost)

    def candidate_removed(self, votes):
        total_similarity = self.total_similarity()
        # Creates the amount of votes for each point
        similarity_percentage = 100.0/float(total_similarity)
        percentHash = dict()

        # Distribute the votes between other candidates
        for key in self.CandidateSimilarity:
            percentage_gained = (similarity_percentage * self.CandidateSimilarity[key]) / 100.0
            votes_gained = votes * percentage_gained
            percentHash[key] = int(votes_gained)

        return percentHash

    def total_similarity(self):
        total = 0
        for key in self.CandidateSimilarity:
            total += self.CandidateSimilarity[key]

        return total


