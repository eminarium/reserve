require 'test_helper'

class SubjectCategoriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get subject_categories_index_url
    assert_response :success
  end

  test "should get show" do
    get subject_categories_show_url
    assert_response :success
  end

  test "should get create" do
    get subject_categories_create_url
    assert_response :success
  end

  test "should get update" do
    get subject_categories_update_url
    assert_response :success
  end

  test "should get destroy" do
    get subject_categories_destroy_url
    assert_response :success
  end

end
