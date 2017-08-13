import a1_design
import unittest

class Test_BasicMatrix(unittest.TestCase):
    def Test___init__(self):
        SomeObj = BasicMatrix(3,4)
        x = SomeObj.get_matrix()
        self.assertEqual(SomeObj.get_matrix(),x,"Matrix Failed to initialize")

    def Test_set_elem(self):
        SomeObj = BasicMatrix(3,4)
        SomeObj.set_elem(9,(1,1))
        x = SomeObj.get_matrix()
        self.assertEqual(x, 9, "set_elem not returning the correct element")

    def Test_get_elem(self):
        Some_Obj = BasicMatrix(3,4)
        SomeObj.set_elem(1,(1,1))
        x = SomeObj.get_elem((1,1))
        self.assertEqual(x,1,
                         "Given element format incorrect or out of index.")
    def Test_get_row(self):
        SomeObj = BasicMatrix(3,4)
        x = SomeObj.get_row(1)
        self.assertEqual(x,[0,0,0,0],
                         "Row out of index or matrix not initialized properly")
    def Test_get_column(self):
        SomeObj = BasicMatrix(3,4)
        x = SomeObj.get_column(1)
        self.assertEqual(x,[0,0,0],
                         "Value out of index or matrix not initialized")
    def Test_transpose(self):
        SomeObj = BasicMatrix(3,4)
        SomeObj.set_elem(99,(0,1))
        SomeObj.transpose()
        x = [[0,0,0,0],[99,0,0,0],[0,0,0,0]]
        y =  SomeObj.get_matrix()
        self.assertEqual(y,x,"Matrix not initialized properly")
    def Test_scalarMultiply(self):
        SomeObj = BasicMatri(2,2)
        someObj.set_elem(10,(0,0))
        SomeObj.scalarMultiply(2)
        x = SomeObj.get_matrix()
        y = [[20,0],[0,0]]
        self.assertEqual(x,y,"Scalar Multiplication could not occur")
    def Test_MatrixMultiply(self):
        SomeObj = BasicMatrix(2,2)
        OtherObj = BasicMatrix(2,2)
        SomeObj.set_elem(3,(0,0))
        SomeObj.MatrixMultiply(OtherObj)
        x = OtherObj.get_matrix()
        y = SomeObj.get_matrix()
        self.assertEqual(y,x,"Operation could not occur")
    def Test_add(self):
        SomeObj = BasicMatrix(2,2)
        OtherObj = BasicMatrix(2,2)
        SomeObj.set_elem(3,(0,0))
        OtherObj.add(SomeObj)
        x = OtherObj.get_matrix()
        self.assertEqual(x,SomeObj.get_matrix(),"Matrix failed to add")
    def Test_subtract(self):
        SomeObj = BasicMatrix(2,2)
        OtherObj = BasicMatrix(2,2)
        SomeObj.set_elem((-3),(0,0))
        OtherObj.subtract(SomeObj)
        x = OtherObj.get_matrix()
        self.assertEqual(x,SomeObj.get_matrix(),"Matrix failed to subtract")
    def Test_swap_row(self):
        SomeObj = BasicMatrix(3,4)
        SomeObj.set_elem(10,(0,0))
        SomeObj.swap_row(0,1)
        OtherObj = Basicmatrix(3,4)
        OtherObj.set_elem(10,(1,0))
        x = SomeObj.get_matrix()
        y = OtherObj.get_matrix()
        self.assertEqual(x,y,"Swap Row Failed")
    def Test_swap_colm(self):
        SomeObj = BasicMatrix(3,4)
        x = 
        self.assertEqual()
    def Test_get_matrix(self):
        SomeObj = BasicMatrix(3,4)
        x = SomeObj.get_matrix()
        self.assertEqual(x, [[0,0,0,0],[0,0,0,0],[0,0,0,0]],
                         "matrix not initialized")
    def Test_MatrixSizeChecker(self):
        First_matrix = BasicMatrix(2,3)
        Second_matrix = BasicMatrix(2,3)
        checker = First_matrix.MatrixSizeChecker(Second_matrix)
        answer = True
        self.assertEqual(checker, answer,
                         "The MatrixSizeChecker could not check the matrices")


class TestOneDimMatrix(unittest.TestCase):
    def Test___init__(self):
        SomeObj = OneDimMatrix(1,10)
        x = SomeObj.get_matrix()
        mtx_checker = [[0,0,0,0,0,0,0,0,0,0]]
        self.assertEqual(x, mtx_checeker,
                         "OneDimMatrix failed to initialize properly")
    def Test_get_elem(self):
        SomeObj = OneDimMatrix(1,10)
        x = SomeObj.get_elem(3)
        self.assertEqual(x, 0, "Failed to get element from OneDimMatrix")
    def Test_set_elem(self):
        SomeObj = OneDimMatrix(1,3)
        SomeObj.set_matrix(10,1)
        Otherobj = OneDimMatrix(1,10)
        Otherobj.set_matrix(10,1)
        x = SomeObj.get_matrix()
        y = Otherobj.get_matrix()
        self.assertEqual(x,y,"Failed to set element in OneDimMatrix")



class TestSquareMatrix(unittest.TestCase):
    def Test__init__(self):
        SqMtx = SquareMatrix(2)
        var1 = SqMtx.get_matrix()
        mtx_checker = [[0,0],[0,0]]
        self.assertEqual(var1, mtx_checker,
                         "Square Matrix not initiaized properly")
    def Test_get_determinant(self):
        Matrixtester = SquareMatrix(3)
        x = Matrixtester.get_determinant
        y = 0
        self.assertEqual(x,y,"Determinant was not found")


class TestIdentityMatrix(unittest.TestCase):
    def Test__init__(self):
        someobj = IdentityMatrix(2)
        checker = [[1,0],[0,1]]
        x = someobj.get_matrix()
        self.assertEqual(x,checker,"")