class MatrixIndexError(Exception):
    '''An attempt has been made to access an invalid index in this matrix'''


class MatrixDimensionError(Exception):
    '''An attempt has been made to perform an operation on this matrix which
    is not valid given its dimensions'''


class MatrixInvalidOperationError(Exception):
    '''An attempt was made to perform an operation on this matrix which is
    not valid given its type'''


class MatrixNode():
    '''A general node class for a matrix'''

    def __init__(self, contents, right=None, down=None):
        '''(MatrixNode, obj, MatrixNode, MatrixNode) -> NoneType
        Create a new node holding contents, that is linked to right
        and down in a matrix
        '''
        self._contents = contents
        self._right = right
        self._down = down

    def __str__(self):
        '''(MatrixNode) -> str
        Return the string representation of this node
        '''
        return str(self._contents)

    def get_contents(self):
        '''(MatrixNode) -> obj
        Return the contents of this node
        '''
        return self._contents

    def set_contents(self, new_contents):
        '''(MatrixNode, obj) -> NoneType
        Set the contents of this node to new_contents
        '''
        self._contents = new_contents

    def get_right(self):
        '''(MatrixNode) -> MatrixNode
        Return the node to the right of this one
        '''
        return self._right

    def set_right(self, new_node):
        '''(MatrixNode, MatrixNode) -> NoneType
        Set the new_node to be to the right of this one in the matrix
        '''
        self._right = new_node

    def get_down(self):
        '''(MatrixNode) -> MatrixNode
        Return the node below this one
        '''
        return self._down

    def set_down(self, new_node):
        '''(MatrixNode, MatrixNode) -> NoneType
        Set new_node to be below this one in the matrix
        '''
        self._down = new_node


class Matrix():
    '''A class to represent a mathematical matrix'''

    def __init__(self, m, n, default=0):
        '''(Matrix, int, int, float) -> NoneType
        Create a new m x n matrix with all values set to default
        '''
        self._head = MatrixNode(None)
        self._rows = m
        self._cols = n
        self._def = default

    def get_val(self, i, j):
        '''(Matrix, int, int) -> float
        Return the value of m[i,j] for this matrix m
        '''
        if i > self._rows - 1 or j > self._cols - 1 or i < 0 or j < 0:
            raise MatrixIndexError('Index out of range')

        node = self._head.get_right().get_down()
        for m in range(0, i - 1):
            node = node.get_down()
        for n in range(0, j - 1):
            node = node.get_right()
        return node.get_contents()

    def set_node(node, i, j):
        next = self._head
        prev = self._head
        res = self
        tail = self.get_val(self._rows - 1, self._cols - 1)
        for x in range(self._rows - 1, 0):
            for y in range(self._cols - 1, 0):
                tail = self.get_val(x, y)
                res.set_right(tail)
            res.set_down(res)
            res.set_down(tail)

    def get_node(self, i, j):
        node = self._head.get_right().get_down()
        for x in range(0, i - 1):
            node = node.get_down()
        for y in range(0, j - 1):
            node = node.get_right()
        return node

    def set_val(self, i, j, new_val):
        '''(Matrix, int, int, float) -> NoneType
        Set the value of m[i,j] to new_val for this matrix m
        '''
        if i > self._rows - 1 or j > self._cols - 1 or i < 0 or j < 0:
            raise MatrixIndexError('Index out of range')

        res = Matrix(self._rows, self._cols)

        node = self.get_node(i, j).se
        node.set_contents(new_val)
        self.set_node(i, j, node)

    def get_row(self, row_num):
        '''(Matrix, int) -> OneDimensionalMatrix
        Return the row_num'th row of this matrix
        '''
        res = Matrix(1, self._cols)

        for i in range(0, self._cols - 1):
            res.set_val(0, i, self.get_val(row_num - 1, i))

        return res

    def set_row(self, row_num, new_row):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the row_num'th row of this matrix to those of new_row
        '''
        if row_num > self._rows or row_num < 1:
            raise MatrixIndexError('Index out of range')

        for i in range(1, self._cols):
            self.set_val(row_num, 1, new_row.get_val(1, i))

    def get_col(self, col_num):
        '''(Matrix, int) -> OneDimensionalMatrix
        Return the col_num'th column of this matrix
        '''
        res = Matrix(self._rows, 1)

        for i in range(0, self._rows - 1):
            res.set_val(i, 0, self.get_val(i, col_num - 1))

        return res

    def set_col(self, col_num, new_col):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the col_num'th column of this matrix to those
        of new_row
        '''
        if col_num > self._cols or col_num < 1:
            raise MatrixIndexError('Index out of range')

        for i in range(1, self._rows):
            self.set_val(1, col_num, new_col.get_val(i, 1))

    def swap_rows(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of rows i and j in this matrix
        '''
        row_i = self.get_row(i)
        row_j = self.get_row(j)

        self.set_row(j, row_i)
        self.set_row(i, row_j)

    def swap_cols(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of columns i and j in this matrix
        '''
        col_i = self.get_col(i)
        col_j = self.get_col(j)

        self.set_col(j, col_i)
        self.set_col(i, col_j)

    def add_scalar(self, add_value):
        '''(Matrix, float) -> NoneType
        Increase all values in this matrix by add_value
        '''
        for i in range(0, self._rows - 1):
            for j in range(0, self._cols - 1):
                self.set_val(i, j, self.get_val(i, j) + add_value)

    def subtract_scalar(self, sub_value):
        '''(Matrix, float) -> NoneType
        Decrease all values in this matrix by sub_value
        '''
        for i in range(0, self._rows - 1):
            for j in range(0, self._cols - 1):
                self.set_val(i, j, self.get_val(i, j) - sub_value)

    def multiply_scalar(self, mult_value):
        '''(Matrix, float) -> NoneType
        Multiply all values in this matrix by mult_value
        '''
        for i in range(0, self._rows - 1):
            for j in range(0, self._cols - 1):
                self.set_val(i, j, self.get_val(i, j) * mult_value)

    def add_matrix(self, adder_matrix):
        '''(Matrix, Matrix) -> Matrix
        Return a new matrix that is the sum of this matrix and adder_matrix
        '''
        res = Matrix(self._rows, self._cols)

        for i in range(0, self._rows - 1):
            for j in range(0, self._cols - 1):
                res.set_val(i, j, self.get_val(i, j) +
                            adder_matrix.get_val(i, j))
        return res

    def multiply_matrix(self, mult_matrix):
        '''(Matrix, Matrix) -> Matrix
        Return a new matrix that is the product of this matrix and mult_matrix
        '''
        # 1 by n
        res = Matrix(self._rows, self._cols)

        for i in range(0, self._rows - 1):
            for j in range(0, self._cols - 1):
                res.set_val(i, j, self.get_val(i, j) *
                            mult_matrix.get_val(0, j))
        return res


class OneDimensionalMatrix(Matrix):
    '''A 1xn or nx1 matrix.
    (For the purposes of multiplication, we assume it's 1xn)'''

    def get_item(self, i):
        '''(OneDimensionalMatrix, int) -> float
        Return the i'th item in this matrix
        '''
        return Matrix.get_val(self, i, 1)

    def set_item(self, i, new_val):
        '''(OneDimensionalMatrix, int, float) -> NoneType
        Set the i'th item in this matrix to new_val
        '''
        Matrix.set_val(self, i, new_val)


class SquareMatrix(Matrix):
    '''A matrix where the number of rows and columns are equal'''

    def transpose(self):
        '''(SquareMatrix) -> NoneType
        Transpose this matrix
        '''

    def get_diagonal(self):
        '''(Squarematrix) -> OneDimensionalMatrix
        Return a one dimensional matrix with the values of the diagonal
        of this matrix
        '''

    def set_diagonal(self, new_diagonal):
        '''(SquareMatrix, OneDimensionalMatrix) -> NoneType
        Set the values of the diagonal of this matrix to those of new_diagonal
        '''


class SymmetricMatrix(SquareMatrix):
    '''A Symmetric Matrix, where m[i, j] = m[j, i] for all i and j'''


class DiagonalMatrix(SquareMatrix, OneDimensionalMatrix):
    '''A square matrix with 0 values everywhere but the diagonal'''


class IdentityMatrix(DiagonalMatrix):
    '''A matrix with 1s on the diagonal and 0s everywhere else'''
