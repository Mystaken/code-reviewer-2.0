class Matrix():
    def __init__(self : ‘matrix’, number of columns : ‘list of objects’, number of rows : ‘list of objects’, values: list of list of objects) -> None:
        self.row_numbers = number_of_rows
        self.column_numbers = number_of_columns
        self.values = values
    
    def get_column_value(self: ‘matrix’,number : ‘int’) -> object:
        '''Given an int, returns the value of the objects in the column
        '''
        pass
    def get_row_value(self: ‘matrix’,number : ‘int’) -> object:
        '''Given an int, returns the value of the objects in the row
        '''        
        pass
    def set_column_value(self: ‘matrix’,number : ‘int’, value: object) ->None:
        '''Given an int and a list of lists, sets the value of the objects in the column
        '''        
        pass
    def set_row_value(self: ‘matrix’,number : ‘int’, value: object) ->None:
        '''Given an int and a list of lists, sets the value of the objects in the row
        '''        
        pass
    def swap_rows (self: ‘matrix’,row1 : ‘int’, row2 : ‘int’) -> None:
        '''Given two rows, swaps their values
        '''        
        pass
    def swap_columns(self: ‘matrix’,column1 : ‘int’, column2 : ‘int’) -> None:
        '''Given two columns, swaps their values
        '''
        pass
    def add (self: ‘matrix’,number_row1: ‘int’, number_row2 :’int’, number_column1 : ‘int’, number_column2 : ‘int’) -> object:
        '''Given the row and column positions for two numbers, returns their sums
        '''
        pass
    def subtract (self: ‘matrix’,number_row1: ‘int’, number_row2 :’int’, number_column1 : ‘int’, number_column2 : ‘int’) -> object:
        '''Given the row and column positions for two numbers, returns their difference
        '''
        pass
    def multiply_numbers (self: ‘matrix’,number_row1: ‘int’, number_row2 :’int’, number_column1 : ‘int’, number_column2 : ‘int’) -> object:
        '''Given the row and column positions for two numbers, returns their multiple
        '''
        pass
    def transpose_matrix (self: ‘matrix’)->None:
        '''Transposes the matrix
        '''
        pass
    
class Letter_Matrix(Matrix):
    def __init__(self : ‘matrix’, number of columns : ‘list of int’, number of rows : ‘list of int’, values: list of list of str) -> None:
        Matrix.values = values
        
    def add_str (self: ‘matrix’,number_row1: ‘int’, number_row2 :’int’, number_column1 : ‘int’, number_column2 : ‘int’) -> str:
        '''Given the row and column positions for two letters, returns their concatonated result
        '''
        pass

class One_dimensional_matrix(Matrix):
    def __init__(self : ‘matrix’, number of columns : ‘list of objects’, number of rows : ‘list of objects’, values: list of list of objects) -> None:
        pass
    def set_value_at_position(self : ‘matrix’, index:’int’, value: object)-> None:
        '''Given a position value, and a value, sets the value of the object at the position
        '''
        pass
    def get_value_at_position(self : ‘matrix’, index:’int’)-> object:
        '''Given a position value, returns the value of the object at the position
        '''
        pass
    
class Square_Matrix(Matrix):
    def __init__(self : ‘matrix’, number of columns : ‘list of int’, values: list of list of object) -> None:
        pass
    
    def set_diagonal_left_to_right(self : ‘matrix’, values: list of objects)-> None:
        '''Given a list of objects, sets the values of the matrix from the top left diagonally to the bottom right
        '''
        pass
    def set_diagonal_right_to_left(self : ‘matrix’, values: list of objects)-> None:
        '''Given a list of objects, sets the values of the matrix from the top right diagonally to the bottom left
        '''
        pass
    
class symmetrical_matrix(Square_Matrix):
    def __init__(self : ‘matrix’, number of columns : ‘list of int’, values: list of list of object) -> None:
        pass    
    def _change_other_value(self: ‘matrix’, value: ‘object’)->None:
        '''Internal method that mirrors the changes in an object in one position to its mirror (x,y)->(y,x)
        '''
        pass

class two_by_two_matrix(Square_Matrix):
    def __init__(self : ‘matrix’, values: list of list of object) -> None:
        pass    
    def get_determinant(self : ‘matrix’)-> object:
        '''Returns the determinant of the matrix
        '''
        pass
    
class Identity_matrix(Square_Matrix):
    def __init__(self : ‘matrix’, number of columns : ‘list of int’, value: object) -> None:
        pass