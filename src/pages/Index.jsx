import React, { useState } from "react";
import { Box, Heading, Text, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("salary");
  const [editIndex, setEditIndex] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTransactions = [...transactions];
      updatedTransactions[editIndex] = { date, amount: +amount, type, category };
      setTransactions(updatedTransactions);
      setEditIndex(null);
    } else {
      setTransactions([...transactions, { date, amount: +amount, type, category }]);
    }
    setDate("");
    setAmount("");
    setType("income");
    setCategory("salary");
    onClose();
  };

  const handleEdit = (index) => {
    const transaction = transactions[index];
    setDate(transaction.date);
    setAmount(transaction.amount.toString());
    setType(transaction.type);
    setCategory(transaction.category);
    setEditIndex(index);
    onOpen();
  };

  const handleDelete = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  const totalBalance = transactions.reduce((total, transaction) => {
    return transaction.type === "income" ? total + transaction.amount : total - transaction.amount;
  }, 0);

  return (
    <Box maxWidth="800px" margin="auto" padding="20px">
      <Heading as="h1" size="xl" textAlign="center" marginBottom="20px">
        Budgeting App
      </Heading>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Text fontSize="2xl">Total Balance: ${totalBalance.toFixed(2)}</Text>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
          Add Transaction
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Type</Th>
            <Th>Category</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction, index) => (
            <Tr key={index}>
              <Td>{transaction.date}</Td>
              <Td>${transaction.amount.toFixed(2)}</Td>
              <Td>{transaction.type}</Td>
              <Td>{transaction.category}</Td>
              <Td>
                <IconButton icon={<FaEdit />} aria-label="Edit" marginRight="10px" onClick={() => handleEdit(index)} />
                <IconButton icon={<FaTrash />} aria-label="Delete" onClick={() => handleDelete(index)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editIndex !== null ? "Edit Transaction" : "Add Transaction"}</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl marginBottom="10px">
                <FormLabel>Date</FormLabel>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </FormControl>
              <FormControl marginBottom="10px">
                <FormLabel>Amount</FormLabel>
                <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </FormControl>
              <FormControl marginBottom="10px">
                <FormLabel>Type</FormLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Select>
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel>Category</FormLabel>
                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="salary">Salary</option>
                  <option value="groceries">Groceries</option>
                  <option value="bills">Bills</option>
                </Select>
              </FormControl>
              <Button type="submit" colorScheme="blue" marginRight="10px">
                {editIndex !== null ? "Save" : "Add"}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
