class Matrix:
    def __init__(self: 'Matrix', rows: int, 
                 columns: int) -> None:
        pass
    
    def set_value(self: 'Matrix', row: int,
                  column: int, 
                  content: object) -> None:
        '''
        (int, int, object) -> None
        Given the row and column number of an element, sets its value as the
        given value.
        '''
        pass
    
    def get_value(self: 'Matrix', 
                  row: int, 
                  column: int) -> object:
        '''
        (int, int) -> object
        Given the row and column numbers of an element, returns its value.
        '''        
        pass

    def set_row(self: 'Matrix', 
                row: int, 
                values: object) -> None:
        '''
        (int, list) -> None
        Given a row number, sets its values to the values given.
        '''        
        pass
    
    def get_row(self: 'Matrix', 
                row: int) -> list:
        '''
        (int) -> list
        Given a row number, returns its values.
        '''   
        pass
    
    def set_column(self: 'Matrix', 
                   column: int, 
                   value: object) -> None:
        '''
        (int, list) -> None
        Given a column number, sets its values to the values given.
        '''      
        pass
    
    def get_column(self: 'Matrix', 
                   column: int) -> list:
        '''
        (int) -> list
        Given a column number, returns its values.
        '''       
        pass
    
    def transpose(self: 'Matrix') -> None:
        '''
        (None) -> None
        Transposes the matrix, inverting its rows and columns with each other.
        '''   
        pass
    
    def swap(self: 'Matrix', 
             row: int, 
             column: int) -> None:
        '''
        (int, int) -> None
        Given a row and a column number, swaps their contents.
        '''        
        pass
    
    def get_matrix(self: 'Matrix') -> object:
        '''
        (None) -> Matrix
        Returns the values of the matrix.
        '''        
        pass


class Number(Matrix):
    def __init__(self: 'Number') -> None:
        pass
    
    def add(self: 'Number', 
            matrix1: object, 
            matrix2: object) -> object:
        '''
        (Number, Number) -> Number
        Given two equally sized matrices with numbers as their only values, 
        adds each element with its corresponding element.
        '''        
        pass
    
    def subtract(self: 'Number', 
                 matrix1: object, 
                 matrix2: object) -> object:
        '''
        (Number, Number) -> Number
        Given two equally sized matrices with numbers as their only values, 
        subtracts each element from its corresponding element.
        '''       
        pass
    
    def multiply(self: 'Number', 
                 matrix1: object, 
                 matrix2: object) -> object:
        '''
        (Number, Number) -> Number
        Given two matrices with numbers as their only values, multiplies the
        two matrices.
        '''          
        pass


class Letter(Matrix):
    def __init__(self: 'Letter') -> None:
        pass
    
    def add(self: 'Letter', 
            matrix1: object, 
            matrix2: object) -> object:
        '''
        (Letter, Letter) -> Letter
        Given two equally sized matrices with strings as their only values, 
        concatenates each element with its corresponding element.
        '''         
        pass


class One_Dimensional(Number):
    def __init__(self: 'One_Dimensional') -> None:
        pass
    
    def set_value(self: 'One_Dimensional', 
                  element: int, 
                  value: object) -> None:
        '''
        (int, object) -> None
        Given an element number, sets its value to the given value.
        '''    
        pass
    
    def get_value(self: 'One_Dimensional', 
                  element: int) -> object:
        '''
        (int) -> object
        Given an element number, returns its value.
        '''    
        pass


class Square(Number):
    def __init__(self: 'Square') -> None:
        pass
    
    def set_diagonal(self: 'Square', 
                     value: object) -> None:
        '''
        (list) -> None
        Sets the elements of the diagonal to the given values.
        '''         
        pass
    
    def get_diagonal(self: 'Square') -> list:
        '''
        (None) -> list
        Returns the values of the elements of the diagonal.
        '''        
        pass


class Identity(Square):
    def __init__(self: 'Identity', 
                 diagonal_value: float) -> None:
        pass


class Symmetric(Square):
    def __init__(self: 'Symmetric') -> None:
        pass
    
    def set_value(self: 'Symmetric',
                  row: int,
                  column: int,
                  value: object) -> None:
        '''
        (object) -> None
        Sets the value of the element specified by given row and column
        numbers respectively to the given value, and also sets the symmetrical 
        value specified by column and row respectively to the given value.
        '''    
        pass