import Candidate
import Vote
bob = Candidate.Candidate("Bob", {"Sam": 3, "Jenny": 0})
sam = Candidate.Candidate("Sam", {"Bob": 4, "Jenny": 0})
jenny = Candidate.Candidate("Jenny", {"Sam": 1, "Bob": 0})
candidates = [bob, sam, jenny]
voteBreakdown = {bob: 50, sam: 20, jenny: 30}

voteins = Vote.Vote(candidates, voteBreakdown)

voteins.print_candidates()
voteins.print_winner()

