class MatrixIndexError(Exception):
    '''An attempt has been made to access an invalid index in this matrix'''
    pass

class MatrixDimensionError(Exception):
    '''An attempt has been made to perform an operation on this matrix which
    is not valid given its dimensions'''
    pass

class MatrixInvalidOperationError(Exception):
    '''An attempt was made to perform an operation on this matrix which is
    not valid given its type'''
    pass

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
        
        self.row = 0
        self.column = 0

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
        self._max_rows = m
        self._max_columns = n
        self._up_link = None
        self._down_link = None
        
        self._curr = self._head
        
        for row_number in range(m):
            new_row = MatrixNode(row_number)
            self._curr.set_down(new_row)
            self._curr = self._curr.get_down()
        
        self._curr = self._head
        for column_number in range(n):
            new_column = MatrixNode(column_number)
            self._curr.set_right(new_column)
            self._curr = self._curr.get_right()
        
        self._curr = self._head
        
        for row_number in range(m):
            self._up_link = self._curr.get_right()
            self._curr = self._curr.get_down()
            self._down_link = self._curr
            
            for column_number in range(n):
                tempNode = MatrixNode(0)
                self._down_link.set_right(tempNode)
                self._up_link.set_down(tempNode)
                
                self._down_link = self._down_link.get_right()
                self._up_link = self._up_link.get_right()
        self._curr = self._head

    def get_val(self, i, j):
        '''(Matrix, int, int) -> float
        Return the value of m[i,j] for this matrix m
        '''
        self._curr = self._head
        
        if i > self._max_rows or j > self._max_columns:
            raise MatrixDimensionError
        
        for row in range(i):
            self._curr = self._curr.get_down()
        
        for column in range(j):
            self._curr = self._curr.get_right()
        
        return self._curr.get_contents()


    def set_val(self, i, j, new_val):
        '''(Matrix, int, int, float) -> NoneType
        Set the value of m[i,j] to new_val for this matrix m
        '''
        self._curr = self._head
        
        if i > self._max_rows or j > self._max_columns:
            raise MatrixDimensionError
        
        for row in range(i):
            self._curr = self._curr.get_down()
            
        for column in range(j):
            self._curr = self._curr.get_right()
        
        self._curr.set_contents(new_val)
        self._curr = self._head
        
        
    def get_row(self, m):
        '''(Matrix, int) -> OneDimensionalMatrix
        Return the m'th row of this matrix
        '''
        self._curr = self._head
        
        if m > self._max_rows:
            raise MatrixDimensionError
        
        self._oneD = OneDimensionalMatrix(self._max_columns)
        
        #go down to row m
        for row in range(m):
            self._curr = self._curr.get_down()
        
        #set each value of new One D matrix to that of its counterpart row
        #in the original matrix
        for column in range(self._max_columns):
            self._curr = self._curr.get_right()
            self._oneD.set_val(1,column + 1, self._curr.get_contents())

            
        self._curr = self._head
        
        return self._oneD

    def set_row(self, row_num, new_row):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the m'th row of this matrix to those of new_row
        '''
        self._curr = self._head
                
        if row_num > self._max_rows:
            raise MatrixDimensionError
         
        for row in range(row_num):
            self._curr = self._curr.get_down()
        
       for column in range(self._max_columns):
            self._curr = self._curr.get_right()
            self._curr.set_contents(new_row.get_item(column+1))

        self._curr = self._head        

    def get_col(self, n):
        '''(Matrix, int) -> OneDimensionalMatrix
        Return the n'th column of this matrix
        '''
        self._curr = self._head
        
        if n > self._max_rows:
            raise MatrixDimensionError
        
        self._oneD = OneDimensionalMatrix(self._max_rows)
        
        for row in range(n):
            self._curr = self._curr.get_right()
        
        for row in range(self._max_rows):
            self._curr = self._curr.get_down()
            self._oneD.set_val(1, row + 1, self._curr.get_contents())

            
        self._curr = self._head
        
        return self._oneD        

    def set_col(self, col_num, new_col):
        '''(Matrix, int, OneDimensionalMatrix) -> NoneType
        Set the value of the n'th column of this matrix to those of new_row
        '''
        self._curr = self._head
                
        if col_num > self._max_rows:
            raise MatrixDimensionError
         
        for column in range(col_num):
            self._curr = self._curr.get_right()
        
        for row in range(self._max_rows):
            self._curr = self._curr.get_down()
            self._curr.set_contents(new_col.get_item(row+1))


        self._curr = self._head
        
    def swap_rows(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of rows i and j in this matrix
        '''
        self.tempRow = self.get_row(i)
        self.set_row(i, self.get_row(j))
        self.set_row(j, self.tempRow)

    def swap_cols(self, i, j):
        '''(Matrix, int, int) -> NoneType
        Swap the values of columns i and j in this matrix
        '''
        self.tempCol = self.get_col(i)
        self.set_col(i, self.get_col(j))
        self.set_col(j, self.tempCol)

    def add_scalar(self, add_value):
        '''(Matrix, float) -> NoneType
        Increase all values in this matrix by add_value
        '''
        self._curr = self._head
        self._rowhead = self._curr
        
        for row in range(self._max_rows):
            self._curr = self._curr.get_down()
            self._rowhead = self._curr
            
            for col in range(self._max_columns):
                self._rowhead = self._rowhead.get_right()
                self._rowhead.set_contents(self._rowhead.get_contents() + 
                                           add_value)
        

    def subtract_scalar(self, sub_value):
        '''(Matrix, float) -> NoneType
        Decrease all values in this matrix by sub_value
        '''
        self._curr = self._head
        self._rowhead = self._curr
        
        for row in range(self._max_rows):
            self._curr = self._curr.get_down()
            self._rowhead = self._curr
            
            for col in range(self._max_columns):
                self._rowhead = self._rowhead.get_right()
                self._rowhead.set_contents(self._rowhead.get_contents() -
                                           sub_value)        

    def multiply_scalar(self, mult_value):
        '''(Matrix, float) -> NoneType
        Multiply all values in this matrix by mult_value
        '''
        self._curr = self._head

        self._rowhead = self._curr
        
        for row in range(self._max_rows):
            self._curr = self._curr.get_down()
            self._rowhead = self._curr
            
            for col in range(self._max_columns):
                self._rowhead = self._rowhead.get_right()
                self._rowhead.set_contents(self._rowhead.get_contents()*
                                           mult_value)       

    def add_matrix(self, adder_matrix):
        '''(Matrix, Matrix) -> Matrix
        Return a new matrix that is the sum of this matrix and adder_matrix
        '''
        self._curr = self._head
        adder_curr = adder_matrix._head
                
        self._rowhead = self._curr
        self._adderhead = adder_curr
        
        for row in range(self._max_rows):
            self._curr = self._curr.get_down()
            adder_curr = adder_curr.get_down()
            self._rowhead = self._curr
            self._adderhead = adder_curr
            
            for col in range(self._max_columns):
                self._rowhead = self._rowhead.get_right()
                self._adderhead = self._adderhead.get_right()
                self._rowhead.set_contents(self._rowhead.get_contents() +
                                           self._adderhead.get_contents())               

    def multiply_matrix(self, mult_matrix):
        '''(Matrix, Matrix) -> Matrix
        Return a new matrix that is the product of this matrix and mult_matrix
        '''
        self._curr = self._head
        multi_curr = mult_matrix._head
        self._rowhead = self._curr
        self._multihead = multi_curr
        
        for row in range(self._max_rows):
            self._curr = self._curr.get_down()
            multi_curr = multi_curr.get_down()
            self._rowhead = self._curr
            self._multihead = multi_curr
            
            for col in range(self._max_columns):
                self._rowhead = self._rowhead.get_right()
                self._multihead = self._multihead.get_right()
                self._rowhead.set_contents(self._rowhead.get_contents() *
                                           self._multihead.get_contents())          


class OneDimensionalMatrix(Matrix):
    '''A 1xn or nx1 matrix.
    (For the purposes of multiplication, we assume it's 1xn)'''
    def __init__(self, m):
        Matrix.__init__(self, 1, m)
        
    def get_item(self, i):
        '''(OneDimensionalMatrix, int) -> float
        Return the i'th item in this matrix
        '''
        item = self.get_val(1, i)
        self._curr = self._head
        return item

    def set_item(self, i, new_val):
        '''(OneDimensionalMatrix, int, float) -> NoneType
        Set the i'th item in this matrix to new_val
        '''
        self.set_val(1, i, new_val)
        self._curr = self._head


class SquareMatrix(Matrix):
    '''A matrix where the number of rows and columns are equal'''
    
    def __init__(self, dimension):
        Matrix.__init__(self, dimension, dimension)
    
    def transpose(self):
        '''(SquareMatrix) -> NoneType
        Transpose this matrix
        '''
        tempMatrix = SquareMatrix(self._max_rows)
        for row in range(self._max_rows):
            tempMatrix.set_row(row, self.get_row(row))
            
        for row in range(self._max_rows+1):
            tempRow = tempMatrix.get_row(row)
            self.set_col(row, tempRow)

    def get_diagonal(self):
        '''(Squarematrix) -> OneDimensionalMatrix
        Return a one dimensional matrix with the values of the diagonal
        of this matrix
        '''
        self._oneD = OneDimensionalMatrix(self._max_rows)
        
        for row in range(self._max_rows+1):
            self._oneD.set_item(row, self.get_val(row,row))
        
        return self._oneD            

    def set_diagonal(self, new_diagonal):
        '''(SquareMatrix, OneDimensionalMatrix) -> NoneType
        Set the values of the diagonal of this matrix to those of new_diagonal
        '''
        
        for row in range(self._max_rows+1):
            self.set_val(row, row, new_diagonal.get_item(row))        


class SymmetricMatrix(SquareMatrix):
    '''A Symmetric Matrix, where m[i, j] = m[j, i] for all i and j'''
     
    def set_val(row, col, new_val):
        '''(int, int, float) -> NoneType
        Sets the value of [col, row] to new_val for every [row, col] specified.
        '''
        self.set_val(row, col, new_val)
        self.set_val(col, row, new_val)
 
 
class DiagonalMatrix(SquareMatrix, OneDimensionalMatrix):
    '''A square matrix with 0 values everywhere but the diagonal'''
     
    def __init__(self, dimension):
        self._size = dimension
        for row in range(self._size):
            if row != column:
                self.set_val(row, col, 0)            
 
 
class IdentityMatrix(DiagonalMatrix):
    '''A matrix with 1s on the diagonal and 0s everywhere else'''
    