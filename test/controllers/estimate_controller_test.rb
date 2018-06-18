require 'test_helper'

class EstimateControllerTest < ActionController::TestCase
  test "should get client:references," do
    get :client:references,
    assert_response :success
  end

  test "should get status:string," do
    get :status:string,
    assert_response :success
  end

  test "should get price_total:string," do
    get :price_total:string,
    assert_response :success
  end

  test "should get order_service_at:timestamp," do
    get :order_service_at:timestamp,
    assert_response :success
  end

  test "should get order_exit_at:timestamp" do
    get :order_exit_at:timestamp
    assert_response :success
  end

end
