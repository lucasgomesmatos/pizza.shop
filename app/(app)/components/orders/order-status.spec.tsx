import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should display the right text based on the order status', () => {
    const wrapper = render(<OrderStatus status="pending" />)

    wrapper.debug()

    // expect(true).toBeTruthy();
  })
})
