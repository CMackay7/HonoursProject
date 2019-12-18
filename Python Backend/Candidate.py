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

    def candidate_removed(self, votes, candidates):
        total_similarity = self.total_similarity(candidates)
        # Creates the amount of votes for each point
        similarity_percentage = 100.0/float(total_similarity)
        percentHash = dict()

        # Distribute the votes between other candidates
        for key in candidates:
            if key.CandidateName != self.CandidateName:
                percentage_gained = (similarity_percentage * self.CandidateSimilarity[key.CandidateName]) / 100.0
                votes_gained = votes * percentage_gained
                percentHash[str(key.CandidateName)] = int(votes_gained)

        return percentHash

    def total_similarity(self, candidates):
        total = 0
        for key in candidates:
            if key.CandidateName != self.CandidateName:
                total += self.CandidateSimilarity[key.CandidateName]

        return total

# todo change this so it doesnt return the name but the object
    def highest(self, valid_candidates):
        highestval = -10

        for candidate in self.CandidateSimilarity:
            if self.CandidateSimilarity[candidate] > 0 and self.CandidateSimilarity[candidate] > highestval:
                highestval = self.CandidateSimilarity[candidate]
                highestcand = Candidate

        if highestval == -10:
            print("oops")

        return candidate


