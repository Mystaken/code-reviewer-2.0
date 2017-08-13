import unittest
import a1_design as obj


class TestSetNodeValue(unittest.TestCase):

	def test_set_int(self):
		matrix_node = obj.MatrixNode(100)
		matrix_node.set_value(200)
		self.assertEqual(
    matrix_node.get_value(),
    200,
     "The set_value method did not set the right int value")

	def test_set_str(self):
		matrix_node = obj.MatrixNode("2300")
		matrix_node.set_value("ABCD")
		self.assertEqual(
    matrix_node.get_value(),
    "ABCD",
     "The set_value method did not set the right str value")

	def test_set_float(self):
		matrix_node = obj.MatrixNode("ABCEDAD")
		matrix_node.set_value(123.32)
		self.assertEqual(
    matrix_node.get_value(),
    123.32,
     "The set_value method did not set the right None value")

	def test_set_none(self):
		matrix_node = obj.MatrixNode("ABCEDAD")
		matrix_node.set_value(None)
		self.assertEqual(
    matrix_node.get_value(),
    None,
     "The set_value method did not set the right None value")


# Test the initializer method of the MatrixNode class
class TestNodeInitializer(unittest.TestCase):

	# Check if the Matrix Node has the proper next and a down value
	def test_initialize_with_value_next_down(self):

		# Create a MatrixNode object with initializing values
		matrix_node = obj.MatrixNode('a', 100, 25)

		# Check if the value given to the node and the pointers are correct
		self.assertEqual(matrix_node.get_value(), 'a', "The node value is incorrect")
		self.assertEqual(
    matrix_node.get_next(),
    100,
     "The value of the next object is incorrect")
		self.assertEqual(
    matrix_node.get_down(),
    25,
     "The value of the object below is incorrect")

	# Check if the default value of next points to None
	def test_initialize_with_value_down(self):

		# Create a MatrixNode object with a value, without defining next value
		matrix_node = obj.MatrixNode(69, down="ABC")

		# Check if the value of the node and the pointers are correct
		self.assertEqual(matrix_node.get_value(), 69, "The node value is incorrect")
		self.assertEqual(
    matrix_node.get_next(),
    None,
     "The value of the next object is not None")
		self.assertEqual(
    matrix_node.get_down(),
    "ABC",
     "The value of the object below is incorrect")

	# Check if the default value of down points to None
	def test_initialize_with_value_next(self):

		# Create a MatrixNode object with a value, without defining next value
		matrix_node = obj.MatrixNode(22, next=300)

		# Check if the value of the node and the pointers are correct
		self.assertEqual(matrix_node.get_value(), 22, "The node value is incorrect")
		self.assertEqual(
    matrix_node.get_next(),
    300,
     "The value of the next object is incorrect")
		self.assertEqual(
    matrix_node.get_down(),
    None,
     "The value of the object below is not None")

	# Check if the default value of next points to None
	def test_initialize_with_next_down(self):

		# Create a MatrixNode object with a value, without defining value
		matrix_node = obj.MatrixNode(down=12.3, next=300)

		# Check if the value of the node and the pointers are correct
		self.assertEqual(matrix_node.get_value(), None, "The node value is not None")
		self.assertEqual(
    matrix_node.get_next(),
    300,
     "The value of the next object is incorrect")
		self.assertEqual(
    matrix_node.get_down(),
    12.3,
     "The value of the object below is incorrect")

	# Check if node initializes with value only
	def test_initialize_with_value(self):

		# Create a MatrixNode object with a value, without defining next and
		# bottom values
		matrix_node = obj.MatrixNode(69)

		# Check if the value of the node and the pointers are correct
		self.assertEqual(matrix_node.get_value(), 69, "The node value is incorrect")
		self.assertEqual(
    matrix_node.get_next(),
    None,
     "The value of the next object is not None")
		self.assertEqual(
    matrix_node.get_down(),
    None,
     "The value of the object below is not None")

	# Check if the node initializes with next value only
	def test_initialize_with_next(self):

		# Create a MatrixNode object with a next, without defining value and
		# bottom values
		matrix_node = obj.MatrixNode(next=69)

		# Check if the value of the node and the pointers are correct
		self.assertEqual(
    matrix_node.get_value(),
    None,
     "The value of the value object is not None")
		self.assertEqual(
    matrix_node.get_next(),
    69,
     "The value of the next object is incorrect")
		self.assertEqual(
    matrix_node.get_down(),
    None,
     "The value of the object below is not None")

	# Check if the node initializes with down value only
	def test_initialize_with_down(self):

		# Create a MatrixNode object with a down, without defining value and down
		# values
		matrix_node = obj.MatrixNode(down="Nots")

		# Check if the value of the node and the pointers are correct
		self.assertEqual(
    matrix_node.get_value(),
    None,
     "The value of the value object is not None")
		self.assertEqual(
    matrix_node.get_next(),
    None,
     "The value of the next object is not None")
		self.assertEqual(
    matrix_node.get_down(),
    "Nots",
     "The value of the object below is incorrect")


class TestMatrixInitializer(self):

	def test_get_row(self):
		M = Matrix(2, 3)
		self.assertEqual(M.get_row(1), [1, 2], 'Get row 2x2 matrix error')
        self.assertEqual(M.get_row(1), [3, 4], 'Get row 2x2 matrix error')

    def test_get_column(self):
    	matrix_node = Matrix(1,2)
    	self.assertEqual(M.get_column(1).get_value(), None,"The get_column doesn't work")
		matrix_node.get_next().set_value(1000)
		self.assertEqual(M.get_column(2), 1000, "The get_column doesn't work")


	def test_swap_column(self):
		M = Matrix(2,3)
		Matrix.get_column(1).set_value(100)
		Matrix.get_column(2).set_value(200)
		Matrix.test_swap_column(1,2)
		set_value.assertEqual(100,M.get_column(1).get_value(),"The swap get_column doesn't work")
		set_value.assertEqual(200,M.get_column(2).get_value(),"The swap get_column doesn't work")

	def test_swap_row(self):
		M = Matrix(2,3)
		Matrix.get_row(1).set_value(100)
		Matrix.get_row(2).set_value(200)
		Matrix.test_swap_column(1,2)
		self.assertEqual(100,M.get_row(1).get_value(),"The swap get_column doesn't work")
		self.assertEqual(200,M.get_row(2).get_value(),"The swap get_column doesn't work")


	def test_transpose(self):
		M = Matrix(2,2)
		M.get_row(1).get_down().set_value(100)
		a = M.get_row(1).get_down().get_value()
		M.transpose()
		self.assertEqual(a, M.get_column(2), "Your transpose method does not work")



unittest.main(exit = False)
