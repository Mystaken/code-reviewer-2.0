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

    def x_coordinate(self, x=None):
        '''
        by using this method, some x value is assigned to the Node
        '''
        self._x_cord = x

    def y_coordinate(self, y=None):
        '''
        by using this method, some y value is assigned to the Node
        '''
        self._y_cord = y

    def get_x(self):
        '''
        Returns the self._x_cord
        '''
        return self._x_cord

    def get_y(self):
        '''
        Returns the self._y_cord
        '''
        return self._y_cord

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
        self._default = default
        self._last_index_r = m-1
        self._last_index_c = n-1

    def _traversal(self, row_col, node, index):
        '''
        (Matrix, str, MatrixNode, int) -> MatrixNode or None
        Given some node and row_col, traverse through the Matrix till u reach
        the index that was given. Return the node.
        REQ:
        row_col == "row" or row_col == "col"
        '''
        self._trav = node
        if row_col == "row":
            # row --> go to the right
            if self._trav is not None:
                self._trav = node.get_right()
                self._trav2 = node
            else:
                self._trav = node
            if self._trav is None:
                self._final_ans = None
            else:
                self._looper = True
                while self._looper:
                    if self._trav is None:
                        self._final_ans = self._trav2
                        self._looper = False
                    else:
                        if self._trav.get_x() < index:
                            self._trav2 = self._trav
                            self._trav = self._trav.get_right()
                            if self._trav is None:
                                self._final_ans = None
                                self._looper = False
                        elif self._trav.get_x() > index:
                            self._final_ans = self._trav2
                            self._looper = False
                        elif self._trav.get_x() == index:
                            self._final_ans = self._trav
                            self._looper = False
        elif row_col == "col":
            # col --> go down the node
            if self._trav is not None:
                self._trav = node.get_down()
                self._trav2 = node
            else:
                self._trav = node
            if self._trav is None:
                self._final_ans = None
            else:
                self._looper = True
                while self._looper:
                    if self._trav is None:
                        self._final_ans = self._trav2
                        self._looper = False
                    else:
                        if self._trav.get_y() < index:
                            self._trav2 = self._trav
                            self._trav = self._trav.get_down()
                            if self._trav is None:
                                self._final_ans = None
                                self._looper = False
                        elif self._trav.get_x() > index:
                            self._final_ans = self._trav2
                            self._looper = False
                        elif self._trav.get_x() == index:
                            self._final_ans = self._trav
                            self._looper = False
        return self._final_ans

    def _indexer(self, row_col, index_num):
        '''
        (Matrix, str, int) -> MatrixNode
        Given a string stating to find the row or column and an index, find
        it within the Matrix, if it is not there, create it as long as
        it is within the set size.
        REQ:
        row_col == "row" or row_col == "col"
        index_num < self._last_index_r if row_col == "row"
         index_num < self._last_index_c if row_col == "col"
        '''
        if row_col == "col":
            # if you are given "col" then go to the RIGHT
            self._helper = self._head
            self._current = self._helper.get_right()
            if self._current is None:
                self._current = self._node_creator(index_num, 0, index_num)
                self._helper.set_right(self._current)
            while self._current.get_contents() != index_num:
                if self._current.get_contents() < index_num:
                    self._helper = self._current
                    self._current = self._current.get_right()
                    if self._current is None:
                        self._current = self._node_creator(
                            index_num, 0, index_num)
                        self._helper.set_right(self._current)
                elif self._current.get_contents() > index_num:
                    self._helper.set_right(self._node_creator(
                        index_num, 0, index_num))
                    self._helper.get_right().set_right(self._current)
                    self._current = self._helper.get_right()
        elif row_col == "row":
            # if you are given "row" then go DOWN
            self._helper = self._head
            self._current = self._helper.get_down()
            if self._current is None:
                self._current = self._node_creator(0, index_num, index_num)
                self._helper.set_down(self._current)
            while self._current.get_contents() != index_num:
                if self._current.get_contents() < index_num:
                    self._helper = self._current
                    self._current = self._current.get_down()
                    if self._current is None:
                        self._current = self._node_creator(
                            0, index_num, index_num)
                        self._helper.set_down(self._current)
                elif self._current.get_contents() > index_num:
                    self._helper.set_down(self._node_creaotr(
                        0, index_num, index_num))
                    self._helper.get_down().set_down(self._current)
                    self._current = self._helper.get_down()
        # returning the node with the desired index
        return self._current

    def _node_creator(self, x, y, value):
        '''
        (Matrix, int, int) -> MatrixNode
        Given an x, y and a value, create a node with those
        values and coordiantes.
        '''
        self._node = MatrixNode(value)
        self._node.x_coordinate(x)
        self._node.y_coordinate(y)
        return self._node

    def get_val(self, i, j):
        '''(Matrix, int, int) -> float
        Return the value of m[i, j] for this matrix m
        '''
        # Note to self: j --> go right, i --> go down

        # go to the head node and loop through until you reach correct
        self._ind_x = j-1
        self._ind_y = i-1
        self._checkx = self._ind_x <= self._last_index_c
        self._checky = self._ind_y <= self._last_index_r
        if not (self._checkx and self._checky):
            raise MatrixDimensionError()
        self._x_ind = self._traversal("row", self._head, self._ind_x)
        self._result = self._traversal("col", self._x_ind, self._ind_y)
        if self._result is None:
            self._result = self._default
        return self._result

    def set_val(self, i, j, new_val):
        '''(Matrix, int, int, float) -> NoneType
        Set the value of m[i, j] to new_val for this matrix m
        The index they ask for is +1 of our Matrix's index.
        '''

        # look for what is around the location of the node
        # So if you don't find another around it, you will hit the index node
        self._ind_x = j-1
        self._ind_y = i-1
        self._checkx = self._ind_x <= self._last_index_c
        self._checky = self._ind_y <= self._last_index_r
        if not (self._checkx and self._checky):
            raise MatrixDimensionError()
        # create the new node, we have checked that the index is within
        # our set limit
        self._new_node = MatrixNode(new_val)
        self._new_node.x_coordinate(self._ind_x)
        self._new_node.y_coordinate(self._ind_y)
        # there is nothing in the Matrix
        # create index node for the new value
        self._hold_row = self._indexer("row", self._ind_y)
        self._hold_col = self._indexer("col", self._ind_x)
        self._hold_row.set_right(self._new_node)
        self._hold_col.set_down(self._new_node)
        # a passing boolean that skips over locating index
        self._current = self._indexer("row", self._ind_y)

    def get_row(self, row_num):
        '''(Matrix, int) -> OneDimensionalMatrix
        Return the row_num'th row of this matrix
        '''
        self._index = self._traversal("row", self._head, row_num-1)

    def set_row(self, row_num, new_row):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the row_num'th row of this matrix to those of new_row
        '''
        self._index = self._traversal("row", row_num-1)
        self._index.set_right(new_row)

    def get_col(self, col_num):
        '''(Matrix, int) -> OneDimensionalMatrix
        Return the col_num'th column of this matrix
        '''

    def set_col(self, col_num, new_col):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the col_num'th column of this matrix
        to those of new_row
        '''
        self._index = self._traversal("col", col_num)
        self._index.set_down(new_col)

    def swap_rows(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of rows i and j in this matrix
        '''
        self._ind_1 = self._traversal("row", i-1)
        self._ind_2 = self._traversal("row", j-1)
        self._temp2 = self._ind_1.get_right()
        self._temp1 = self._ind_2.get_right()
        self._ind_1.set_right(self._temp1)
        self._ind_2.set_right(self._temp2)

    def swap_cols(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of columns i and j in this matrix
        '''
        self._ind_1 = self._traversal("col", i-1)
        self._ind_2 = self._traversal("col", j-1)
        self._temp2 = self._ind_1.get_down()
        self._temp1 = self._ind_2.get_down()
        self._ind_1.set_down(self._temp1)
        self._ind_2.set_down(self._temp2)

    def add_scalar(self, add_value):
        '''(Matrix, float) -> NoneType
        Increase all values in this matrix by add_value
        '''

    def subtract_scalar(self, sub_value):
        '''(Matrix, float) -> NoneType
        Decrease all values in this matrix by sub_value
        '''

    def multiply_scalar(self, mult_value):
        '''(Matrix, float) -> NoneType
        Multiply all values in this matrix by mult_value
        '''

    def add_matrix(self, adder_matrix):
        '''(Matrix, Matrix) -> Matrix
        Return a new matrix that is the sum of this matrix and adder_matrix
        '''
        if (adder_matrix.row_giver() != self.row_giver()) and (
                adder_matrix.col_giver() != self.col_giver()):
            raise MatrixInvalidOperationError()

    def multiply_matrix(self, mult_matrix):
        '''(Matrix, Matrix) -> Matrix
        Return a new matrix that is the product of this matrix and mult_matrix
        '''
        if self.col_giver() != mult_matrix._row_giver():
            raise MatrixInvalidOperationError()

    def row_giver(self):
        '''
        (Matrix) -> int
        Returns size of rows
        '''
        return self._last_index_r

    def col_giver(self):
        '''
        (Matrix) -> int
        Returns the size of the columns
        '''
        return self._last_index_c


class OneDimensionalMatrix(Matrix):
    '''A 1xn or nx1 matrix.
    (For the purposes of multiplication, we assume it's 1xn)'''

    def get_item(self, i):
        '''(OneDimensionalMatrix, int) -> float
        Return the i'th item in this matrix
        '''

    def set_item(self, i, new_val):
        '''(OneDimensionalMatrix, int, float) -> NoneType
        Set the i'th item in this matrix to new_val
        '''
    def set_col(self, col_num, new_col):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the col_num'th column of this matrix
        to those of new_row
        '''
        raise MatrixInvalidOperationError()

    def swap_rows(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of rows i and j in this matrix
        '''
        raise MatrixInvalidOperationError()

    def set_row(self, row_num, new_row):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the row_num'th row of this matrix to those of new_row
        '''

    def swap_cols(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of columns i and j in this matrix
        '''

    def multiply_matrix(self, mult_matrix):
        '''(Matrix, Matrix) -> Matrix
        Return a new matrix that is the product of this matrix and mult_matrix
        '''


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

    def get_item(self, i):
        '''
        (DiagonalMatrix, int)
        Given i, take and return the ith diagonal value in the DiagonalMatrix.
        '''

    def set_item(self, i, new_val):
        '''
        Given i, find the value in the matrix located at the (i, i)th index
        and repace that value with new_val.
        ***Replacing the item #1 should replace item on index (0, 0)
        '''
        pass

    def set_val(self, i, j, new_val):
        if i != j:
            raise MatrixInvalidOperationError()
        else:
            super(DiagonalMatrix, self).set_val(i, j)

    def get_val(self, i, j):
        if i != j:
            return 0
        else:
            return super(DiagonalMatrix, self).get_val(i, j)

    def swap_rows(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of rows i and j in this matrix
        '''
        raise MatrixInvalidOperationError()

    def swap_cols(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of columns i and j in this matrix
        '''
        raise MatrixInvalidOperationError()


class IdentityMatrix(DiagonalMatrix):
    '''A matrix with 1s on the diagonal and 0s everywhere else'''
    # overwrite things that would make the Identity matrix no longer one.
    def set_val(self, i, j, new_val):
        raise MatrixInvalidOperationError()

    def set_col(self, col_num, new_col):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the col_num'th column of this matrix
        to those of new_row
        '''
        raise MatrixInvalidOperationError()

    def swap_rows(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of rows i and j in this matrix
        '''
        raise MatrixInvalidOperationError()

    def set_row(self, row_num, new_row):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the row_num'th row of this matrix to those of new_row
        '''
        raise MatrixInvalidOperationError()

    def swap_cols(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of columns i and j in this matrix
        '''
        raise MatrixInvalidOperationError()

    def add_scalar(self, add_value):
        '''(Matrix, float) -> NoneType
        Increase all values in this matrix by add_value
        '''
        raise MatrixInvalidOperationError()

    def subtract_scalar(self, sub_value):
        '''(Matrix, float) -> NoneType
        Decrease all values in this matrix by sub_value
        '''
        raise MatrixInvalidOperationError()

    def multiply_scalar(self, mult_value):
        '''(Matrix, float) -> NoneType
        Multiply all values in this matrix by mult_value
        '''
        raise MatrixInvalidOperationError()

    def add_matrix(self, adder_matrix):
        '''(Matrix, Matrix) -> Matrix
        Return a new matrix that is the sum of this matrix and adder_matrix
        '''
        raise MatrixInvalidOperationError()

    def multiply_matrix(self, mult_matrix):
        '''(Matrix, Matrix) -> Matrix
        Return a new matrix that is the product of this matrix and mult_matrix
        '''
        raise MatrixInvalidOperationError()
