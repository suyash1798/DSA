# There exist two undirected trees with n and m nodes, numbered from 0 to n - 1 and from 0 to m - 1, respectively. You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the second tree.

# You must connect one node from the first tree with another node from the second tree with an edge.

# Return the minimum possible diameter of the resulting tree.

# The diameter of a tree is the length of the longest path between any two nodes in the tree.

 

# Example 1:

# Input: edges1 = [[0,1],[0,2],[0,3]], edges2 = [[0,1]]

# Output: 3

# Explanation:

# We can obtain a tree of diameter 3 by connecting node 0 from the first tree with any node from the second tree.

# Example 2:


# Input: edges1 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]], edges2 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]]

# Output: 5

# Explanation:

# We can obtain a tree of diameter 5 by connecting node 0 from the first tree with node 0 from the second tree.

 

# Constraints:

# 1 <= n, m <= 105
# edges1.length == n - 1
# edges2.length == m - 1
# edges1[i].length == edges2[i].length == 2
# edges1[i] = [ai, bi]
# 0 <= ai, bi < n
# edges2[i] = [ui, vi]
# 0 <= ui, vi < m
# The input is generated such that edges1 and edges2 represent valid trees.


class Solution:
    def minimumDiameterAfterMerge(
        self, edges1: List[List[int]], edges2: List[List[int]]
    ) -> int:
        graph1 = defaultdict(list)
        graph2 = defaultdict(list)
        n = len(edges1)
        m = len(edges2)

        for a, b in edges1:
            graph1[a].append(b)
            graph1[b].append(a)

        for a, b in edges2:
            graph2[a].append(b)
            graph2[b].append(a)

        d = 0

        def dfs(root, parent, graph):
            nonlocal d
            max1, max2 = 0, 0

            for node in graph[root]:
                if node == parent:
                    continue
                p = 1 + dfs(node, root, graph)

                if p >= max1:
                    max2 = max1
                    max1 = p
                elif p > max2:
                    max2 = p
            
            d = max(d, max1 + max2)

            return max1

        mini1, mini2, maxi = n, m, 0

        dfs(0, -1, graph1)
        d1 = d

        d = 0
        
        dfs(0, -1, graph2)
        d2 = d

        return max(d1, d2, (d1 + 1) // 2 + (d2 + 1) // 2 + 1)
