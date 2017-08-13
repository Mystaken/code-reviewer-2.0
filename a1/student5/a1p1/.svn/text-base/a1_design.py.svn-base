class InvalidRowColumnLength(Exception):
    """
    This error class is raised when multiplying and the row length and
    the height length of the two matrices are not equal.
    """
    pass


class InvalidTypeMatch(Exception):
    """
    This error class is raised when 2 different types of objects try to do
    a mathematical operations.
    """
    pass


class OutOfBoundError(Exception):
    """
    This error class is raised when the user attempts to access a row or
    a column that doesn't exists
    """
    pass


class MatrixNode:
    """
    This object is a datatype used to create a matrix. The datatype is
    a modified linked list that has 2 pointers. One points to the object
    below and the other points to the object to its right
    """

    def __init__(self, value=None, next=None, down=None):
        """
        (MatrixNode, object, object, object) -> None

        The initializer method is used to initialize the MatrixNode,
        The initalizer takes in a value, the value it points below and next.
        These values are set to None by default.

        """
        pass

    def get_value(self):
        """
        (MatrixNode) -> object

        This method is used to get the value of the MatirixNode itself.
        """
        pass

    def set_value(self, obj):
        """
        (MatrixNode, object) -> None

        This method is used to set the current value of the MatrixNode.
        It takes in the value of the obj and sets it as the value of the
        MatrixNode.
        """
        pass

    def get_down(self):
        """
        (MatrixNode) -> object

        This method is used to get the value of the bottom pointer of
        the MatrixNode.
        """
        pass

    def set_down(self, obj):
        """
        (MatrixNode, object) -> None

        This method is used to change the value of the bottom pointer of
        the MatrixNode.
        """
        pass

    def get_next(self):
        """
        (MatrixNode) -> object
        This method is used to get the value of the next pointer of the
        MatrixNode
        """
        pass

    def set_next(self, obj):
        """
        (MatrixNode) -> object
        This method is used to set the value of the next pointer of the
        MatrixNode
        """
        pass

    def get_type(self):
        """
        (MatrixNode) -> type
        This method is used to check the type of the current value.
        """
        pass


class Matrix:
    """
    The Matrix object is used to represent a matrix built out of MatrixNodes
    """

    def __init__(self, row, column):
        """
        (Matrix, int, int) -> None

        The initializer is used to create a Matrix which is modified linked list.
        The user enters rows and column length to create a row * column matrix.
        The value of each MatrixNode is set to None.
        """
        pass

    def get_row(self, row_number):
        """
        (Matrix, int) -> MatrixNode

        This method grabs the first MatrixNode of the specified row number
        """
        pass

    def set_row(self, list_of_objects):
        """
        (Matrix, list of objects) -> None

        This method changes the values of the node in a certain row
        with respect to the list of objects.

        REQ:
        len(list_of_objects) == self.get_row_length()

        """
        pass

    def get_column(self, column_number):
        """
        (Matrix, int) -> node
        This method grabs the first MatrixNode of the column
        """
        pass

    def set_column(self, list_of_objects):
        """
        (Matrix, list of objects) -> None

        This method changes the values of the MatrixNodes in a certain column
        with respect to the list of objects.

        REQ:
        len(list_of_objects) == self.get_column_length()

        """
        pass

    def multiply_row(self, row_number, multiplier):
        """
        (Matrix, int, int) -> None

        This method takes the row and multiplies all the values
        with the multiplier
        """
        pass

    def add_two_rows(self, row_one_number, row_two_number):
        """
        (MatrixNode,int,int) -> None

        This method takes in 2 rows and adds them, the row_number_one row
        will take in the value of the sum of the 2 rows
        """
        pass

    def add_two_rows(self, row_one_number, row_two_number):
        """
        (MatrixNode,int,int) -> None

        This method takes in 2 rows and subtracts them, the row_number_one row
        will take in the value of the subtraction of the 2 rows
        """
        pass

    def transpose(self):
        """
        (Matrix) -> None

        This method creates a transpose of the current matrix
        """
        pass

    def swap_row(self, row_one_number, row_two_number):
        """
        (Matrix, int, int) -> None

        This method swaps the rows in row_one_number and row_two_number
        """
        pass

    def swap_column(self, column_one_number, column_two_number):
        """
        (Matrix, int, int) -> None

        This method swaps the column in column_one_number and column_two_number
        """
        pass

    def multiply_martix(self, matrix):
        """
        (Matrix, Matrix) -> None
        This method multiplies 2 matrices together and then puts the new matrix in
        the current matrix
        """
        pass

    def subtract_martix(self, matrix):
        """
        (Matrix, Matrix) -> None
        This method subtracts 2 matrices together and then puts the new matrix in
        the current matrix
        """
        pass

    def add_martix(self, matrix):
        """
        (Matrix, Matrix) -> None
        This method adds 2 matrices together and then puts the new matrix in
        the current matrix
        """
        pass

    def get_determinant(self):
        """
        (Matrix) -> float
        This method returns the determinant of the 2x2 matrix

        REQ:
        self.get_row_length() == 2 and self.get_column_length() == 2
        """
        pass

    def get_row_length(self):
        """
        (Matrix) -> int

        This method returns the amount of elements in a row of the
        matrix

        """
        pass

    def get_column_length(self):
        """
        (Matrix) -> int

        This method returns the amount of elements in a column of the
        matrix

        """
        pass


class SquareMatrix(Matrix):
    """
    The SquareMatrix object is used to create a square matrix
    """

    def __init__(self, row_column):
        """
        (SquareMatrix, int) -> None

        The initailizer takes in an integer which becomes the row length and
        column length
        """

    def get_diagonal(self):
        """
        (SquareMatrix) -> list of MatrixNode

        This method returns the MatrixNodes that are diagonal in a list
        """
        pass


class RowSingle(Matrix):
    """
    This object represents a single row vector
    """

    def __init__(self, length):
        """
        (RowSingle, int) -> None
        The initializer creates a row vector to use

        """

    def get_item(self, column_number):
        """
        (RowSingle, int) -> MatrixNode

        This method is used to get a MatrixNode in a specific column.

        """
        pass

    def set_item(self, obj):
        """
        (RowSingle, Object) -> None

        This method is used to set the current value of MatrixNode to obj.

        """
        pass


class ColumnSingle(Matrix):
    """
    This object represents a single column vector
    """

    def __init__(self, length):
        """
        (ColumnSingle, int) -> None
        The initializer creates a column vector to use

        """

    def get_item(self, column_number):
        """
        (ColumnSingle, int) -> MatrixNode

        This method is used to get a MatrixNode in a specific row.

        """
        pass

    def set_item(self, obj):
        """
        (ColumnSingle, Object) -> None

        This method is used to set the current value of MatrixNode to obj.

        """
        pass


class SymmetricMatrix(SquareMatrix):
    """
    This object is used to create a Symmetric Matrix with values that
    mirror eachother
    """

    def set_value(self, column_number, row_number, obj):
        """
        ("SymmetricMatrix, int, int, object) -> None
        This method is used to set the value of the matrix node in the matrix.
        This method is slightly different because if you change one value, its
        respective mirror value will also change
        """
        pass
