class Matrix:
    '''
    A class to set up the matrix and perform some operations
    '''

    def __init__(self, col, row, num_col, num_row, value):
        '''
        (Matrix, int, int, int, int, int) -> NoneType
        Initatializes a new matrix with the row, col as well as
        number of rows and columns
        '''

    def mult(self):
        '''
        (Matrix) -> list of list
        Return a matrix that is the product of two matrices
        '''

    def get_row(self, row):
        '''
        (Matrix, int) -> list
        Return a particular row of a matrix
        '''

    def get_col(self, col):
        '''
        (Matrix, int) -> list
        Return a particular column of a matrix
        '''

    def set_row(self, row, value):
        '''
        (Matrix, int, int) -> NoneType
        Sets the value of a row of a matrix
        '''

    def set_col(self, col, value):
        '''
        (Matrix, int, int) -> NoneType
        Sets the value of a column of a matrix
        '''

    def get_transpose(self):
        '''
        (Matrix) -> list of list
        Gets the transpose of a given matrix
        '''

    def swap_rows(self, row):
        '''
        (Matrix, int) -> list of list
        Returns a matrix with certain rows swapped
        '''

    def swap_col(self, col):
        '''
        (Matrix, int) - list of list
        Returns a matrix with certain columns swapped
        '''


class Rectangular:
    '''
    A class for matrices that are not of the form 'nxn'
    '''

    def __init__(self, col, row):
        '''
        (Rectangular, int, int) -> NoneType
        Initializes a rectangular matrix
        '''

    def add_num(self):
        '''
        (Rectangular) -> list of list
        Returns the sum of two matrices made up of integers
        '''

    def sub(self):
        '''
        (Rectangular) -> list of list
        Returns the result of subtracting two matrices
        '''

    def add_let(self):
        '''
        (Rectangular) -> list of list
        Returns the sum of two matrices made of strings
        '''


class OneDim:
    '''
    Class for one dimensional matrices
    '''

    def __int__(self, col):
        '''
        (OneDim, int) -> NoneType
        Initializes a one dimensional matrix
        '''

    def get_element(self, col):
        '''
        (OneDim, int) -> list
        Returns an element of a one dimensional matrix based on the given
        column
        '''


class Square:
    '''
    class for nxn matrices
    '''

    def __init__(self, col, row):
        '''
        (Square, int, int) -> NoneType
        Initializes a square matrix
        '''

    def add_num(self):
        '''
        (Square) -> list of list
        Returns the sum of two matrices made up of integers
        '''

    def sub(self):
        '''
        (Square) -> list of list
        Returns the result of subtracting two matrices
        '''

    def add_let(self):
        '''
        (Square) -> list of list
        Returns the sum of two matrices made of strings
        '''

    def get_diag(self):
        '''
        (Sqaure) -> list
        Returns the values on the diagonal of a sqaure matrix
        '''


class TwoByTwo:
    '''
    A class for 2x2 matrices
    '''

    def __init__(self, col, row):
        '''
        (TwoByTwo, int, int) -> NoneType
        Initializes a matrix for a 2x2 matrix
        '''

    def get_det(self, col, row):
        '''
        (TwoByTwo, int, int) -> float
        Returns the value of the determinant
        '''


class Symmetric:
    '''
    Class for a symmetric matrix
    '''

    def __init__(self, col, row, value):
        '''
        (Symmetric, int, int, int) -> NoneType
        Initializes a symmetric matrix
        '''

    def change_mirror(self, row, col, value):
        '''
        (Symmetric, int, int, int) -> NoneType
        When a vakue is changed in a symmetric matrix, it changes the value
        of the mirror
        '''


class Identity:
    '''
    Class for identity matrices
    '''

    def __init__(self, col, row, value):
        '''
        (Identity, int, int, int) -> NoneType
        Initializes an identity matrix
        '''

    def set_diag(self, row, col, value):
        '''
        (Identity, int, int, int) -> NoneType
        Sets the value of the diagonal of an identity matrix
        '''
