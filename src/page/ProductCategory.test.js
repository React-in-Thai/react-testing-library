import React from 'react'
import { render, screen, waitFor } from "@testing-library/react";
import ProductCategory from "./ProductCategory";
import { fetchProducts } from "../service/productService";
import { sendDeviceToken } from "../service/notificationService";

jest.mock('../service/productService')
jest.mock('../service/notificationService')

describe('ProductCategory', () => {
  fetchProducts.mockResolvedValue([{ id: 1, name: 'Jun' }])
  sendDeviceToken.mockResolvedValue()
  beforeEach(jest.clearAllMocks)
  it('Bad practice', async () => {
    render(<ProductCategory />)

    // wait for api to settle, however with 'await' all api will settle
    await waitFor(() => {
      // should not assert on api
      expect(fetchProducts).toHaveBeenCalled()
      // or
      expect(fetchProducts.mock.results[0].value).resolves.toBeDefined()
      // should assert on ui
    })

    // await waitFor(() => {}) // this also works

    // then
    screen.getByText('Jun')
    screen.getByText('device sent')
  })

  it('Better practice', async () => {
    render(<ProductCategory />)

    await screen.findByText('Jun')
    await screen.findByText('device sent')

    // Best practice would be
    // await screen.findByRole('alert')
    // screen.getByText('Jun')
    // or
    // await waitFor(() => expect(screen.queryByText('loading')).toBeNull())
    // screen.getByText('Jun')
  })
})
