from collections import defaultdict

class Graph:

    def __init__(self, connections, directed=True):
        self._graph = defaultdict(set)
        self._directed = directed
        self.add_connections(connections)

    def add_connections(self, connections):
       # """ Add connections (list of tuple pairs) to graph """

        for node1, node2 in connections:
            self.add(node1, node2)

    def add(self, node1, node2):
        """ Add connection between node1 and node2 """

        self._graph[node1].add(node2)


    def is_connected(self, node1, node2):
        """ Is node1 directly connected to node2 """

        return node1 in self._graph and node2 in self._graph[node1]


    def find_path(self, node1, node2, path=[]):
        """ Find any path between node1 and node2 (may not be shortest) """

        path = path + [node1]
        if node1 == node2:
            return path
        if node1 not in self._graph:
            return None
        for node in self._graph[node1]:
            if node not in path:
                new_path = self.find_path(node, node2, path)
                if new_path:
                    return new_path
        return None

    def is_cycle_util(self, v, visited, rec_stack):
        visited.append(v)
        rec_stack.append(v)

        for neighbour in self._graph[v]:
            if not neighbour in visited:  # visited[neighbour == False]:
                if self.is_cycle_util(neighbour, visited, rec_stack):
                    return True
            elif neighbour in rec_stack:  # rec_stack[neighbour] == True:
                return True

        rec_stack.remove(v)  # rec_stack = False
        return False

    def isCyclic(self):
        visited = []
        rec_stack = []

        for node in self._graph:
            if not node in visited:
                if self.is_cycle_util(node, visited, rec_stack):
                    return True
            return False


    def find_source(self):
        source_dict = defaultdict(int)
        for key in self._graph:
            source_dict[key] = 0
        for key in self._graph:
            for vertex in self._graph[key]:
                source_dict[vertex] += 1

        return_val = ""
        for key in source_dict:
            if source_dict[key] == 0:
                return_val = key




    def __str__(self):
        return '{}({})'.format(self.__class__.__name__, dict(self._graph))



