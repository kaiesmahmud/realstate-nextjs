'use client'
import React, { useEffect, useState } from 'react'

//chakra ui
import { Box, Flex, Text, Icon, Select, Spinner } from '@chakra-ui/react'

//Next element
import Image from 'next/image'
import { useRouter } from 'next/router'

//react-icons
import {MdCancel} from 'react-icons/md'

//filterData from utils
import { filterData, getFilterValues } from '@/utils/filterData'


const SearchFilters = () => {
    
    const router = useRouter();
    const [filters, setFilters] = useState(filterData);

    const searchProperties = (filterValues) => {
        const path = router.pathname ;
        const {query} = router;

        const values = getFilterValues(filterValues);

        values?.forEach(item => {
            query[item.name] = item.value ;
        })

        router.push({pathname: path , query})
    }
    
  return (
    <Flex bg="gray.100" p='4' justifyContent="center" flexWrap="wrap" >
        {
            filters.map((filter) => (
                <Box key={filter.queryName}>
                    <Select
                     onChange={(e) => searchProperties({[filter.queryName]: e.target.value})}
                     placeholder={filter.placeholder}
                     w="fit-content"
                     p='2'
                     >
                        {
                            filter?.items?.map((item) =>  (
                                <option value={item.value} key={item.value} >
                                    {item.name}
                                </option>
                            ))
                        }
                    </Select>
                </Box>
            ))
        }
    </Flex>
  )
}

export default SearchFilters