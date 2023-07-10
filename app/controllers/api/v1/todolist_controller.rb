class Api::V1::TodolistController < ApplicationController
 
 
  def index
    todolists = Todolist.all
    render json: todolists
  end

  def create
    todolists = Todolist.create!(todolist_params)
    if todolists
      render json: todolists
    else
      render json: todolists.errors
    end
  end

 

  def update

    todo = Todolist.find(params[:id])

    if todo.update!(todolist_params)

      render json: { message: "Todo Item updated successfully" }

    else

      render json: { message: "An error occured" }

    end

  end

  private

  def todolist_params
    params.permit(:title, :description, :completed)
  end
  
  

  
 
end
