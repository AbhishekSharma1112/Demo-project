import React, { useState, useEffect } from 'react';
import { Select, Table } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { SearchOutlined } from '@ant-design/icons'; 

const SearchableSelectWithTable: React.FC = () => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [value, setValue] = useState<SelectValue | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  // fake api call , put whatever api needs to be called inside fetch
  useEffect(() => {
    fetch('https://my-json-server.typicode.com/typicode/demo/posts')
      .then((response) => response.json())
      .then((data) => {
        const optionsData = data.map((item: any) => ({
          label: item.title,
          value: item.id,
        }));
        setOptions(optionsData);
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  //filter products list based on selected value 
  const filteredProducts = value
    ? products.filter((product) => product.id.toString() === value.toString())
    : products;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
    },
  ];

  return (
    <div>
      <Select
        showSearch
        style={{ width: 200, marginBottom: 10 }}
        placeholder="Select a category"
        optionFilterProp="children"
        onChange={(newValue: React.SetStateAction<SelectValue | null>) => setValue(newValue)}
        // filterOption={(input: string, option: { children: string; }) =>
        //   option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        // }
        value={value}
        suffixIcon={<SearchOutlined/>}
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <Table dataSource={filteredProducts} columns={columns} />
    </div>
  );
};

export default SearchableSelectWithTable;
