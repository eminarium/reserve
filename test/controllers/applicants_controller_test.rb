require 'test_helper'

class ApplicantsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get applicants_index_url
    assert_response :success
  end

  test "should get show" do
    get applicants_show_url
    assert_response :success
  end

  test "should get create" do
    get applicants_create_url
    assert_response :success
  end

  test "should get update" do
    get applicants_update_url
    assert_response :success
  end

  test "should get destroy" do
    get applicants_destroy_url
    assert_response :success
  end

end
