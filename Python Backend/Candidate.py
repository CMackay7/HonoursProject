from collections import defaultdict
class Candidate:

    # CLASS VARIABLES
    CandidateName = ""
    CandidateSimilarity = []

    def __init__(self, CandidateNameIn = "", CandidateSimilarityIn = None):
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

    def set_name(self, candidatename):
        self.CandidateName = candidatename

    def set_similarity(self, candidate_similarity):
        if not isinstance(candidate_similarity.values()[0], int):
            candidate_similarity = self.interise_set(candidate_similarity)

        self.CandidateSimilarity = candidate_similarity


    # the data which will be added will come straight from json and so it will be a string which we dont want
    # this function just changes every entry so it is an int
    def interise_set(self, set):
        out_dict = defaultdict(int)
        for key in set:
            out_dict[key] = int(set[key])

        return out_dict

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


