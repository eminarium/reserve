require 'test_helper'

class SubjectTestsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get subject_tests_index_url
    assert_response :success
  end

  test "should get show" do
    get subject_tests_show_url
    assert_response :success
  end

  test "should get create" do
    get subject_tests_create_url
    assert_response :success
  end

  test "should get update" do
    get subject_tests_update_url
    assert_response :success
  end

  test "should get destroy" do
    get subject_tests_destroy_url
    assert_response :success
  end

end
