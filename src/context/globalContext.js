import React, { useContext, useEffect, useState } from "react"
import axios from 'axios'


const BASE_URL = "https://money-manager-orxh.onrender.com";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    // const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)


    //calculate incomes
    const addIncome = async (income) => {
        try{
        const response = await axios.post(`${BASE_URL}/moneytracker/add-income`, income)
        console.log(response.data)
        }
            catch(err) {
               console.log(err)
            }
            getIncomes()
    }

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/moneytracker/all`)
        setIncomes(response.data)
        console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}