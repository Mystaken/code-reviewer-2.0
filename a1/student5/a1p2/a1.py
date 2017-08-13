
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
        self._col = None
        self._row = None

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

    def get_column(self):
        return self._col

    def get_row(self):
        return self._row

    def set_row(self, row):
        self._row = row

    def set_coulumn(self, col):
        self._col = col


class Matrix():
    '''A class to represent a mathematical matrix'''

    def __init__(self, m, n, default=0):
        '''(Matrix, int, int, float) -> NoneType
        Create a new m x n matrix with all values set to default
        '''
        self._head = MatrixNode(None)
        self._col = m
        self._row = n
        self._default = default

    def get_val(self, i, j):
        '''(Matrix, int, int) -> float
        Return the value of m[i,j] for this matrix m
        '''
        # Check for incorrect dimension size errors
            if(self.dimension_checker(i=i, j=j)):
                raise MatrixIndexError

        else:
                # Set the current value as the default value
            value = self._default
            # If the column and row exist
            if(not(self.search_index_row(i) and self.search_index_column(j))):
                # Make pointer to head
                current = self._head
                # while the current is not None, Search for the column
                while((current is not None) and (current.get_contents() != j)):
                    # Change column if not correct column
                    current = current.get_right()
                # Search for the correct row
                while((current is not None) and (current.get_row() != i)):
                    # Move  a row down if current is not the correct row
                    current = current.get_down()

                if(type(current) is MatrixNode):
                    # Make value equal to the contents of the node that was
                    # being searched
                    value = current.get_contents()

            return value

    def set_val(self, i, j, new_val):
        '''(Matrix, int, int, float) -> NoneType
        Set the value of m[i,j] to new_val for this matrix m
        '''

        # Create a new row index
        row_index = self.insert_row(i)
        # Create a new column index
        column_index = self.insert_column(j)

        # Create a new matrix node to store the items
        new_mat = MatrixNode(new_val, None, None, i, j)
        # Use current pointer to point to the row index
        current = row_index
        # Make previous pointer equals to None
        previous = None

        # Check if the set value is the first node
        if (current.get_right() is None):
            # Set the right value of the new node to None
            new_mat.set_right(None)
            # Make the current pointer of the node set its right to the new
            # node
            current.set_right(new_mat)

        # If node is not the first item
        else:

            while (current.get_right().get_column()
                   != column_index.get_contents()):
                # Make previous pointer equal to current
                previous = current
                # Make current pointer point to its right
                current = current.get_right()
                # Check if the current's column matches the row_index
                if (current.get_column() == row_index):
                    # Check if the item is a Matrix Node
                    if type(current) is MatrixNode:
                        # Change its value rather than adding the node
                        current.set_contents(new_val)
                    else:
                        # Set the current pointer to the new node
                        current.set_right(new_val)

    def get_row(self, row_num):
        '''(Matrix, int) -> OneDimensionalMatrix
        Return the row_num'th row of this matrix
        '''
        if(self.dimension_checker(i=row_num)):
            raise MatrixIndexError

        else:
            matrix = OneDimensionalMatrix(self._row)

            current = matrix._head

            while ((current is not None) and (
                    current.get_contents() == row_num)):
                current = current.get_down()

            if(type(current) is MatrixNode):
                matrix.set_down(current)
                row = matrix.get_down()
                matrix._head.set_down(row)
                row = row.get_right
                while(row is not None):
                    column_number = row.get_column()
                    row.set_row(1)
                    row.set_down(None)
                    matrix.insert_column(column_number)
                    matrix.get_column_index(column_number).set_down(row)
                    row = row.get_right()

            return matrix

    def set_row(self, row_num, new_row):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the row_num'th row of this matrix to those of new_row
        '''
        # Make a pointer to the new_row head
        current = new_row._head
        # Make the pointer run through the columns
        while(current is not None):
            # Use the node below to set the row values
            self.set_val(
                row_num,
                current.get_contents(),
                current.get_down().get_contents())
            # Make current equal to right
            current = current.get_right()

    def get_col(self, col_num):
        '''(Matrix, int) -> OneDimensionalMatrix
        Return the col_num'th column of this matrix
        '''
        if(self.dimension_checker(j=col_num)):
            raise MatrixIndexError
        else:
            matrix = OneDimensionalMatrix(self._col)

            current = matrix._head

            while ((current is not None) and (
                    current.get_contents() == col_num)):
                current = current.get_right()

            if(type(current) is MatrixNode):
                matrix.set_down(current)
                col = matrix.get_right()
                matrix._head.set_right(col)
                col = col.get_down()
                while(row is not None):
                    row_number = col.get_row()
                    col.set_col(1)
                    col.set_right(None)
                    matrix.insert_column(row_number)
                    matrix.get_row_index(rownumber).set_down(col)
                    col = col.get_right()

            return matrix

    def set_col(self, col_num, new_col):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the col_num'th column of this matrix to those of new_row
        '''
        # Make a pointer to the new_row head
        current = new_col._head
        # Make the pointer run through the columns
        while(current is not None):
            # Use the node below to set the row values
            self.set_val(
                col_num,
                current.get_contents(),
                current.get_down().get_contents())
            # Make current equal to right
            current = current.get_right()

    def swap_rows(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of rows i and j in this matrix
        '''
        # Get two of the rows
        row_one = self.get_row(i)
        row_two = self.get_row(j)

        # Switch the rows
        self.set_row(i, row_two)
        self.set_row(j, row_one)

    def swap_cols(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of columns i and j in this matrix
        '''
        # Get two of the columns
        col_one = self.get_col(i)
        col_two = self.get_col(j)

        # Switch the columns
        self.set_col(i, col_two)
        self.set_col(j, col_one)

    def add_scalar(self, add_value):
        '''(Matrix, float) -> NoneType
        Increase all values in this matrix by add_value
        '''

        # Change the default value by adding add_value
        # This prevents creating new nodes and removing nodes that will become
        # default values
        self._default += add_value

        # Make the current pointer point to head
        current = self._head

        # While current is not equal to none loop through the columns
        while(current is not None):
            # Change the current pointer to another column
            current = current.get_right()
            # Make the down pointer point to the current pointer
            down = current
            # Loop through each row
            while (down is not None):
                # Change row
                down = down.get_down()
                # If down is a MatrixNode
                if (type(down) is MatrixNode):
                    # Add value to the node
                    down.set_contents(down.get_contents() + add_value)

    def subtract_scalar(self, sub_value):
        '''(Matrix, float) -> NoneType
        Decrease all values in this matrix by sub_value
        '''
        # Change the default value by multiplying mult_value
        # This prevents creating new nodes and removing nodes that will become
        # default values
        self._default = self._default - sub_value

        # Make the current pointer point to head
        current = self._head

        # While current is not equal to none loop through the columns
        while(current is not None):
            # Make the pointer to the node on its right
            current = current.get_right()
            # Make the down pointer equal to the current pointer
            down = current
            # Loop through the rows until the value is equal to None
            while (down is not None):
                # Make the down pointer equal to the value below
                down = down.get_down()
                if (type(down) is MatrixNode):
                    # Multiply the value of the node
                    down.set_contents(down.get_contents() - sub_value)

    def multiply_scalar(self, mult_value):
        '''(Matrix, float) -> NoneType
        Multiply all values in this matrix by mult_value
        '''
        # Change the default value by multiplying mult_value
        # This prevents creating new nodes and removing nodes that will become
        # default values
        self._default = self._default * mult_value

        # Make the current pointer point to head
        current = self._head

        # While current is not equal to none loop through the columns
        while(current is not None):
            # Make the pointer to the node on its right
            current = current.get_right()
            # Make the down pointer equal to the current pointer
            down = current
            # Loop through the rows until the value is equal to None
            while (down is not None):
                # Make the down pointer equal to the value below
                down = down.get_down()
                if (type(down) is MatrixNode):
                    # Multiply the value of the node
                    down.set_contents(down.get_contents() * mult_value)

    def add_matrix(self, adder_matrix):
        '''(Matrix, Matrix) -> Matrix
        Return a new matrix that is the sum of this matrix and adder_matrix
        '''
        # If matrix not the same size then raise dimension error
        if(dimension_equal_checker()):
            raise MatrixDimensionError
        else:
            # Create a new matrix
            matrix = Matrix(self._row, self._col)
            # Make pointer
            current = self._head
            sec_current = adder_matrix._head
            # Run through each row
            while (current is not None):
                while(sec_current is not None):
                    if(sec_current.get_column() == current.get_column()):
                        # Use set val to add to new matrix
                        matrix.set_val(
                            current.get_row(),
                            current.get_column(),
                            current.get_contents() +
                            sec_current.get_contents())
                    else:
                        # Use set val to add the current val + sec_current
                        # default val
                        matrix.set_val(
                            current.get_row(),
                            current.get_column(),
                            current.get_contents() +
                            sec_current._default)

                    # Change the pointer's value
                    current = current.get_down()
                    sec_current = sec_current.down()

            return matrix

    def multiply_matrix(self, mult_matrix):
        '''(Matrix, Matrix) -> Matrix
        Return a new matrix that is the product of this matrix and mult_matrix
        '''
        # If matrix not the same size then raise dimension error
        if(dimension_mult_checker()):
            raise MatrixDimensionError
        else:
            # Create a new matrix
            matrix = Matrix(self._row, self._col)
            # Make pointer
            current = self._head
            sec_current = mult_matrix._head
            # Run through each row
            while (current is not None):
                while(sec_current is not None):
                    if(sec_current.get_column() == current.get_row()):
                        # Use set val to add to new matrix
                        matrix.set_val(
                            current.get_row(),
                            current.get_column(),
                            current.get_contents() *
                            sec_current.get_contents())
                    else:
                        # Use set val to add the current val * sec_current
                        # default val
                        matrix.set_val(
                            current.get_row(),
                            current.get_column(),
                            current.get_contents() *
                            sec_current._default)
                    # Change the pointer's value
                    current = current.get_down()
                    sec_current = sec_current.right()

            return matrix

    def search_index_row(self, index):

        # Make current point to head
        current = self._head

        # Assume that the column doesn't exist
        result = False

        # Loop through the columns until you find the column or reach None
        while((current is not None) and (result == False)):

            if(current.get_contents() == index):
                # Change current pointer to right
                result = True
            current = current.get_right()

        return result

    def search_index_column(self, index):

        # Make current point to head
        current = self._head

        # Assume that the row doesn't exist
        result = False

        # Loop through the columns until you find the column or reach None
        while((current is not None) and (result == False)):

            if(current.get_contents() == index):
                # Change current pointer to right
                result = True
            current = current.get_down()

        return result

    def insert_column(self, index):

        # Create 2 pointers, to track nodes
        prev = self._head
        current = self._head.get_right()

        # Use Bool to check if column found
        found = False

        # Create a node for the column
        column = MatrixNode(index)

        # If location not found search for column
        while (not(found)):
            # When location found
            if((current is None) or (index < current.get_contents())):
                # Set found to true
                found = True
                # Set the column node right to current
                column.set_right(current)
                # Set thr prev node right to column
                prev.set_right(column)

            else:
                prev = current
                current = current.get_right()

    def insert_row(self, index):
        # Create 2 pointers, to track nodes
        prev = self._head
        current = self._head.get_down()

        # Use Bool to check if row found
        found = False

        # Create a node for the row
        row = MatrixNode(index)

        # If location not found search for row
        while (not(found)):
            # When location found
            if((current is None) or (index < current.get_contents())):
                # Set found to true
                found = True
                # Set the row node right to current
                row.set_down(current)
                # Set the prev node right to row
                prev.set_down(row)

            else:
                prev = current
                current = current.get_down()

    def get_column_index(self, index):
        current = self._head
        while ((current is not None) and (current.get_contents() != index)):
            current = current.get_right()
        return current

    def get_row_index(self, index):
        current = self._head
        while ((current is not None) and (current.get_contents() != index)):
            current = current.get_down()
        return current

    def dimension_checker(self, i=0, j=0):
        return (i > self._row) or (j > self._col)

    def dimension_equal_checker(self, i=0, j=0):
        return (self._row == i) and (self._col == j)

    def dimension_mult_checker(self, j=0):
        return (self._row == j)


class OneDimensionalMatrix(Matrix):
    '''A 1xn or nx1 matrix.
    (For the purposes of multiplication, we assume it's 1xn)'''

    def get_item(self, i):
        '''(OneDimensionalMatrix, int) -> float
        Return the i'th item in this matrix
        '''
        return self.get_val(1, i)

    def set_item(self, i, new_val):
        '''(OneDimensionalMatrix, int, float) -> NoneType
        Set the i'th item in this matrix to new_val
        '''
        # Use inherited method of set_val
        self.set_val(1, i, new_val)


class SquareMatrix(Matrix):
    '''A matrix where the number of rows and columns are equal'''

    def transpose(self):
        '''(SquareMatrix) -> NoneType
        Transpose this matrix
        '''
        # Make a pointer to head
        current = self._head
        # Make a dictionary to store the One dimensional matrices
        storage = dict({})
        # Get the columns of the matrix and put them in a dict
        while(current is not None):
            # Get the index of the column
            index = current.get_contents()
            # Store the one dimensional matrix in storage
            storage[index] = self.get_col()

        # Set the row to the columns
        for column in storage:
            self.set_row(column, storage[column])

    def get_diagonal(self):
        '''(Squarematrix) -> OneDimensionalMatrix
        Return a one dimensional matrix with the values of the diagonal
        of this matrix
        '''
        # Create a new Matrix
        Matrix = OneDimensionalMatrix(self._row)
        # Make a pointer equal to the head
        current = self._head
        # Create a down pointer
        down = current.get_down()
        # Run through each column
        while(current is not None):
            # Column index
            column = current.get_contents()
            # Run through each row to find where self._col == self._row
            while((down is not None) and (down.get_row() != column)):
                # If the node the row is equal to the column
                if (down.get_row() == column):
                    # Insert the contents into the matrix
                    Matrix.set_item(column, down.get_contents())
                else:
                    Matrix.set_item(column, selt._default)

                # Make the down point to down
                down = down.get_down()

            # Make the current equal to the next current
            current = current.right()

        return Matrix

    def set_diagonal(self, new_diagonal):
        '''(SquareMatrix, OneDimensionalMatrix) -> NoneType
        Set the values of the diagonal of this matrix to those of new_diagonal
        '''
        # Check dimensions
        if(dimension_equal_checker(new_diagonal._row, self._col)):
            raise MatrixDimensionError
        else:
            # Get the values of each node in the OneDimensionalMatrix and put
            # it in the diagonal of the matrix
            for column in range(self._col):
                # Set the value
                self.set_val(column, new_diagonal.get_item(column))


class SymmetricMatrix(SquareMatrix):
    '''A Symmetric Matrix, where m[i, j] = m[j, i] for all i and j'''

    def set_value(self, i, j, new_val):
        '''(SymmetricMatrix,int,int) -> NoneType
        '''
        # This is set value also makes its symmetric equivalent the new_val
        self.set_val(i, j, new_val)
        self.set_val(j, i, new_val)


class DiagonalMatrix(SquareMatrix, OneDimensionalMatrix):
    '''A square matrix with 0 values everywhere but the diagonal'''


class IdentityMatrix(DiagonalMatrix):
    '''A matrix with 1s on the diagonal and 0s everywhere else'''
