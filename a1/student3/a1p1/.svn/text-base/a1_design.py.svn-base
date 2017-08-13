class BasicMatrix():
    def __init__(self, row, column):
        '''
        (BasicMatrix, int, int)-> None

        REQ: row >= 1
        column >= 1

        Description:
        Given 2 integers, create an empty Matrix, the size of the matrix
        determined by the integer variable row and column, respective to
        their names, All numbers in matrix will be defaulted to
        0 unless set to a different number. Return None.
        '''
        pass
    def set_elem(self, n, location):
        '''
        (BasicMatrix, int/string, (int,int)) -> None

        REQ:
        location must be in the form of (row, column)
        location MUST exist in the matrix.

        Description: Given a specific integer or string n, 
        set element in location as
        that given variable. Return None
        '''
        pass
    def get_elem(self,location):
        '''
        (BasicMatrix, (int,int)) -> int/string

        REQ: Only works for Non-One dimentional Matrices
        location must be in the form of (row, column)
        location MUST exist in the matrix.

        Description:Given an element location, return the element from the
        Matrix that the User needs.
        '''
        pass
    def get_row(self, row):
        '''
        (BasicMatrix, int) -> list of int/strings

        REQ: row must be within the length of the matrix.

        Description:Given an integer, return the row of that integer.
        '''
        pass
    def get_column(self, column):
        '''
        (BasicMatrix, int) -> list of int/strings

        REQ: Column must be within the length of the matrix.

        Given an integer, return the column of that integer in the form of
        a list.

        '''
        pass
    def transpose(self):
        '''
        (BasicMatrix) ->

        REQ: matrix must have some value in it. ie. cannot be an empty matrix.

        Description: Take the matrix that is in BasicMatrix and
        turn it into the transpose of that Matrix. Returns None.
        '''
        pass
    def scalarMultiply(self,x):
        '''
        (BasicMatrix, int) -> None
        REQ:
        Description: Change the Matrix by multiplying by the integer
        scalar value given.This will Mutate the matrix. Return None.
        '''
        pass
    def MatrixMultiply(self,matr1):
        '''
        (BasicMatrix, BasicMatrix)-> None
        REQ:
        Description:
        Given another BasicMatrix object, multiply this object's Matrix by the
        given object's Matrix IFF _MatrixSizeChecker returns true.
        This will mutate the matrix. Return None.
        '''
        pass
    def MatrixSizeChecker(self, matrix2):
        '''
        (BasicMatrix,BasicMatrix)-> bool
        REQ: 
        Description:
        This method checks and determines whether another matrix is
        can be used in a matrix by matrix operation. Return True if it is
        else return false.
        '''
    def add(self,matr1):
        '''
        (BasicMatrix, BasicMatrix)-> None
        Description:
        Given another BasicMatrix object, add this object's Matrix by the
        given object's Matrix.This will mutate the matrix. Return None.
        '''
        pass
    def subtract(self,matr1):
        '''
        (BasicMatrix, BasicMatrix)-> None
        Description:
        Given another BasicMatrix object, subtract this object's Matrix by the
        given object's Matrix.
        '''
        pass    
    def swap_row(self,row1, row2):
        '''
        (BasicMatrix, int, int)-> None

        REQ: row1 and row2 must exist in the matrix. ie. if the matrix is
        3x3, row1 and row2 can only be 1,2 or 3.

        Description: Given 2 different rows, swap them with each other, this
        would mutate the Matrix. Return None.
        '''
        pass
    def swap_colm(self,colm1,colm2):
        '''
        (BasicMatrix, int, int)-> None
        REQ: colm1 and colm2 must be within the range of the Matrix.
        Description:
        Given two different column numbers, switch the two columns of the
        matrix around.
        '''
    def get_matrix(self):
        '''
        (BasicMatrix)-> List of lists of integer/strings
        REQ: None
        Description: Take the matrix that is in this object, and return it.
        '''
        pass


class OneDimMatrix(BasicMatrix):
    def __init__(self, row, column):
        '''
        (OneDimMatrix, int, int)-> None

        *Notice: Given Number is from a matrix starting at 1,
        ie. 1 is first element, 2 is second element, etc...*

        REQ: (row == 1 and column >= 1) or (row >= 1 and column == 1)
        Description:
        Initialize OneDimMatrix by creating a one dimensional matrix that is
        either Horizontal or Vertical depending on if row == 1 or
        column == 1. Return None.
        *All elements in the matrix will be defaulted to 0 unless set to
        a different number.*
        '''
        pass
    def get_elem(self, location):
        '''
        (OneDimMatrix, int)-> int or str

        *Notice: Given Number is from a matrix starting at 1,
        ie. 1 is first element, 2 is second element, etc...*
        REQ:location must be within the matrix.
        Description:
        Given a location in the form of an integer, return the element that
        is located in that spot
        '''
        pass
    def set_elem(self, location, item):
        '''
        (OneDimMatrix, int, int/string)-> None
        REQ: location must be within matrix.

        Description:
        Given a location of an element(location) and a string or integer
        variable(item),assign item to that element. Return None.
        '''
        pass


class SquareMatrix(BasicMatrix):
    def __init__(self, n):
        '''
        (SquareMatrix, int)-> None

        Description: Given an integer n, create an empty square matrix that is
        n x n in size. Return None.
        '''
        pass
    def get_determinant(self):
        '''
        (SquareMatrix)-> int
        REQ: Matrix must be initialized.
        the square matrix MUST be 2x2.
        Description:
        Take the square matreix of size 2x2, find and return the determinant.
        '''
    def inverse(self):
        '''
        (SquareMatrix)-> SquareMatrix
        REQ: determinant must be of correct value
        Description:
        Take the square matrix, find and return the inverse.
        '''

class IdentityMatrix(SquareMatrix):
    def __init__(self, n):
                 
        '''
        (IdentityMatrix, int)-> None
        Description:
        Initialize an identityMatrix class that is n x n in size. The Matrix
        will have a value of 1 in the diagonal elements,
        all other values will be 0.
        The size of the matrix is determined by n.
        '''
        pass


class MatrixException(Exception):
    '''
    Description: Raised Exception if Matrix is not created properly
    '''

class OperationsException(Exception):
    '''
    Description: Raised Exception if Matrix is not multiplied, added or
    subtracted properly.
    '''

class IllegialException(Exception):
    '''
    Raised Exception if something that a Matrix cannot do is done.
    '''