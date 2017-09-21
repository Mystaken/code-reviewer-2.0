
# Do not change this import statement, or add any of your own!
from regextree import RegexTree, StarTree, DotTree, BarTree, Leaf

# Do not change anything above this comment except for the copyright
# statement

# Student code below this comment.
class inv_regex(Exception):
    def __repr__(self):
        return 'Regex not valid'

def regex_match(r, s):
    '''(Tree, str) -> bool
    Returns true if the string s matches the regex r.
    >>> regex_match('1*', '111')
    True
    '''
    #starts by assuming the string does not match any leaf
    is_left = False
    is_right = False
   
    #iterates through elements in s
    for i in s:
        #Checks contents of leaf in case node is leaf
        if type(r) == Leaf:
            if i != r._symbol:
                return False
        #goes to children until leaf is reached
        elif r._children[1] is not None:
            is_right = regex_match(r._children[1], i)        
        elif r._children[0] is not None:
            is_left = regex_match(r._children[0], i)
 
    #true if string is matched
    return (is_left or is_right)    

def is_regex(s):
    '''(str) -> bool
    Returns True if the supplied string is a valid regex
    >>>is_regex('(1|1)')
    True
    >>>is_regex('(123)')
    False
    '''
    #default result is False
    result = True
    #comparing bracket numbers and operator numbers later, initialized here
    bracket_number = 0
    operator_number = 0
    #if string is empty, it is not a regex
    if len(s) == 0:
        result = False
    #check all items in string s
    for i in s:
        #if item in s is not one of the valid characters, return false
        if i not in ('().|012*'):
            result = False
        #if item is an operator, add 1 to operator
        if i in '.|':
            operator_number += 1
        #add 1 to bracket number if open bracket
        if i == '(':
            bracket_number += 1
        #remove 1 from bracket number if closed bracket
        if i == ')':
            bracket_number -= 1
    #each pair of brackets must have one operator, this checks for it
    if (bracket_number/2) != operator_number:
        result = False
    #returns True if correct number of operators and brackets and correct
    #items
    return (bracket_number == 0) and result

def all_regex_permutations(s):
    '''(str) -> list of str
    Given a regex, produces permutations of the regex that are valid regexes
    '''
    return_list = []
    #passes the string through the permutator helper, which returns the
    #permutations of the string s
    for i in permutator_helper(s):
        #checks if the permutations are valid regexes and adds it to the final
        #list
        if is_regex(i):
            return_list += [i]
    return return_list
    
def permutator_helper(s):
    '''(str) -> list of str
    Given a string, returns a list of permutation strings
    '''
    #base case of 1 character string
    if len(s) == 1:
        return [s[0]]
    #if s is not one character long, recurses through until it is
    elif len(s) > 1:
        l = permutator_helper(s[1:])
        return_list = []
        #for each item , passes them through a helper function that
        #returns a list of permutations
        for i in l:
            for p in permutator(s[0], i):
                if p not in return_list:
                    return_list += [p]
        return return_list 
    else:
        return []    

def permutator(l, s):
    '''(str, str) -> list of str
    Given a character and a string, returns a list of strings that are
    permutations of l with s
    '''
    #recursively adds the string before and after the character l and
    #returns all of them as a list
    return_list = []
    for i in range(len(s)+1):
        generated_string = s[0:i]+l+s[i:]
        if generated_string not in return_list:
            return_list += [generated_string]
    return return_list

def build_regex_tree(regex):
    '''(str) -> Tree
    Given a regex inside a bracket, returns the node which represents that regex
    '''
    #while loop used for going through the regex
    i=0
    #returns a list of list and str
    ret = [[],'']
    #iterates through the regex
    while i< len(regex):
        #a close bracket marks the end of the regex
        if regex[i] == ')':
            return ret
        #an open bracket marks the start of the left child
        elif regex[i] == '(':
            ret[0] += build_regex_tree(regex[i+1:])
            #adds the number of items in the child + the number of brackets(2)
            #and an operator(1)
            i += len(ret[0][0]) + 3
        #adds to the first sublist if it is a valid regex char
        elif regex[i] in '012e':
            ret[0] += regex[i]
            i+=1
        #sets type by looking at operator
        elif regex[i] in '|.*':
            ret[1] = regex[i]
            i += 1
    #bug, had to remove extra brackets
    ret = ret[0]
    #converting to Tree
    if ret[1] == '|':
        ret = BarTree(ret[0][0],ret[0][1])
    elif ret[1] == '.':
        ret = DotTree(ret[0][0],ret[0][1])
    elif ret[1] == '*':
        ret = StarTree(ret[0][0])
    #returns Tree at the end
    return ret
