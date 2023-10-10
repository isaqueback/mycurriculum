import { DragDropAbilitiesContainer } from '@/src/styles/pages/curriculums/sections/abilities/dragDropAbilities'
import { XCircle } from '@phosphor-icons/react/dist/ssr'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import { Ability } from './AbilitiesInput'
import { UseFormSetValue } from 'react-hook-form'
import { CurriculumFormType } from '../InputsForm'

interface DragDropAbilitiesProps {
  abilities: Ability[]
  setAbilities: Dispatch<SetStateAction<Ability[]>>
  setAbilitiesValue: UseFormSetValue<CurriculumFormType>
}

export default function DragDropAbilities({
  abilities,
  setAbilities,
  setAbilitiesValue,
}: DragDropAbilitiesProps) {
  const [winReady, setWinReady] = useState(false)
  const reorder = (
    list: typeof abilities,
    startIndex: number,
    endIndex: number,
  ) => {
    const result = Array.from(list)

    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedabilities = reorder(
      abilities,
      result.source.index,
      result.destination.index,
    )

    setAbilities(reorderedabilities)
  }

  const handleRemoveAbility = (indexToRemove: number) => {
    setAbilities((state) => {
      const updatedAbilites = state.filter((_, idx) => idx !== indexToRemove)

      const allUpdatedAbilitiesContents = updatedAbilites.map(
        (ability) => ability.content,
      )
      setAbilitiesValue('abilities', allUpdatedAbilitiesContents)

      return updatedAbilites
    })
  }

  useEffect(() => {
    setWinReady(true)
  }, [])

  return (
    <DragDropAbilitiesContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        {winReady && (
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {abilities.map((item, index) => {
                  return (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            backgroundColor: snapshot.isDragging
                              ? '#EDEDED'
                              : '',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <span>{item.content}</span>
                          <XCircle onClick={() => handleRemoveAbility(index)} />
                        </li>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </DragDropAbilitiesContainer>
  )
}
