import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Categories() {
    return (
        <div>
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Code quality</AccordionTrigger>
                <AccordionContent>
                    Lyton's code demonstrates a high level of quality, with well-structured and readable implementations. His attention to detail is evident in the consistent use of best practices and adherence to coding standards. Additionally, Lyton's code shows a strong focus on efficiency and maintainability, making it easy for other developers to understand and work with.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Coding style</AccordionTrigger>
                <AccordionContent>
                    Lyton's code is characterized by a consistent and clean coding style. He uses clear and descriptive variable names, maintains a consistent indentation and spacing, and follows best practices for naming conventions. Lyton's code also demonstrates a strong understanding of the principles of object-oriented programming, including inheritance, polymorphism, and encapsulation.
                </AccordionContent>
            </AccordionItem>
        </Accordion><Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Code impact</AccordionTrigger>
                <AccordionContent>
                    Lyton's code demonstrates a high level of impact, with well-structured and readable implementations. His attention to detail is evident in the consistent use of best practices and adherence to coding standards. Additionally, Lyton's code shows a strong focus on efficiency and maintainability, making it easy for other developers to understand and work with.
                </AccordionContent>
            </AccordionItem>
        </Accordion><Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Open source standards</AccordionTrigger>
                <AccordionContent>
                    Lyton's code demonstrates a high level of impact, with well-structured and readable implementations. His attention to detail is evident in the consistent use of best practices and adherence to coding standards. Additionally, Lyton's code shows a strong focus on efficiency and maintainability, making it easy for other developers to understand and work with.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        </div>)
}
