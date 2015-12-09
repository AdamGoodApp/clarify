require 'test_helper'

class BrandsControllerTest < ActionController::TestCase
  setup do
    @brand = brands(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:brands)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create brand" do
    assert_difference('Brand.count') do
      post :create, brand: { competition_1: @brand.competition_1, competition_2: @brand.competition_2, email: @brand.email, how_you_do: @brand.how_you_do, market: @brand.market, personality: @brand.personality, proposition: @brand.proposition, purpose: @brand.purpose, retrieval_key: @brand.retrieval_key, target_audience: @brand.target_audience, what_you_do: @brand.what_you_do, why_you_do: @brand.why_you_do }
    end

    assert_redirected_to brand_path(assigns(:brand))
  end

  test "should show brand" do
    get :show, id: @brand
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @brand
    assert_response :success
  end

  test "should update brand" do
    patch :update, id: @brand, brand: { competition_1: @brand.competition_1, competition_2: @brand.competition_2, email: @brand.email, how_you_do: @brand.how_you_do, market: @brand.market, personality: @brand.personality, proposition: @brand.proposition, purpose: @brand.purpose, retrieval_key: @brand.retrieval_key, target_audience: @brand.target_audience, what_you_do: @brand.what_you_do, why_you_do: @brand.why_you_do }
    assert_redirected_to brand_path(assigns(:brand))
  end

  test "should destroy brand" do
    assert_difference('Brand.count', -1) do
      delete :destroy, id: @brand
    end

    assert_redirected_to brands_path
  end
end
