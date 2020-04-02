require 'test_helper'

class SeasonsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get seasons_index_url
    assert_response :success
  end

  test "should get show" do
    get seasons_show_url
    assert_response :success
  end

  test "should get create" do
    get seasons_create_url
    assert_response :success
  end

  test "should get update" do
    get seasons_update_url
    assert_response :success
  end

  test "should get destroy" do
    get seasons_destroy_url
    assert_response :success
  end

end
